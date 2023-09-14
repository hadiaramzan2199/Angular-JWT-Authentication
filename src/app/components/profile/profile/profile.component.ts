import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { loadModules } from 'esri-loader';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username = '';
  profileData: any;
  layerVisibility = true;
  secondLayerVisibility = true;
  searchResult: any[] = [];

  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;

  private mapView: any;
  private layer: any;
  private secondLayer: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.username = this.getUsernameFromToken();
    this.loadProfile();
    this.loadMap();
  }

  getUsernameFromToken(): string {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.username || '';
    }
    return '';
  }

  loadProfile(): void {
    this.userService.profile().subscribe(
      (response) => {
        this.profileData = response;
      },
      (error) => {
        console.error('Error loading profile:', error);
      }
    );
  }

  logout(): void {
    this.authService.removeToken();
  }

  toggleLayerVisibility(): void {
    this.layerVisibility = !this.layerVisibility;
    this.updateLayerVisibility();
  }

  toggleSecondLayerVisibility(): void {
    this.secondLayerVisibility = !this.layerVisibility;
    this.updateSecondLayerVisibility();
  }

  updateLayerVisibility(): void {
    if (this.layer) {
      this.layer.visible = this.layerVisibility;
    }
  }

  updateSecondLayerVisibility(): void {
    if (this.secondLayer) {
      this.secondLayer.visible = this.secondLayerVisibility;
    }
  }

  loadMap(): void {
    const options = {
      url: 'https://js.arcgis.com/4.20/'
    };

    loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/widgets/Legend'], options).then(
      ([Map, MapView, FeatureLayer, Legend]) => {
        const map = new Map({
          basemap: 'streets-vector'
        });

        this.mapView = new MapView({
          container: 'mapContainer',
          map: map,
          center: [-98, 39],
          zoom: 4
        });


        this.layer = new FeatureLayer({
          url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer' // Replace with the URL of your layer
        });

        this.secondLayer = new FeatureLayer({
          url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Earthquakes_Since1970/MapServer'
        });

        map.add(this.layer);
        map.add(this.secondLayer);

        const legend = new Legend({
          view: this.mapView,
          container: 'legendDiv'
        });
        this.mapView.ui.add(legend, 'bottom-right');
      }
    );
  }
}
