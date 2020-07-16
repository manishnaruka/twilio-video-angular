import { Component, OnInit } from '@angular/core';
import { connect } from 'twilio-video';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(){
    connect('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzM1MGFkMDIxMGUyYThiMDY1OWExNGM5YjMwZWUwYWM1LTE1OTQ5MDYyMzYiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJhZG1pbkBnbWFpbC5jb20iLCJ2aWRlbyI6eyJyb29tIjoiT25rbyBwZXJzb25hbCByb29tIn19LCJpYXQiOjE1OTQ5MDYyMzYsImV4cCI6MTU5NDkwOTgzNiwiaXNzIjoiU0szNTBhZDAyMTBlMmE4YjA2NTlhMTRjOWIzMGVlMGFjNSIsInN1YiI6IkFDYWI4YjEwODZlMjlmZTM3OTExOGM3MGIzNjk0ZDBkZGMifQ.YiNMRiGQzB3W-oMrlMaQ0gvMh1WEzUuHwMAms82ySKY', { name:'onko personal room' }).then(room => {
      console.log(`Successfully joined a Room: ${room}`);
      room.on('participantConnected', participant => {
        console.log(`A remote Participant connected: ${participant}`);
      });
    }, error => {
      console.error(`Unable to connect to Room: ${error.message}`);
    }); 
  }
}
