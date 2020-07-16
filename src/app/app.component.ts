import { Component, OnInit } from '@angular/core';
import { connect } from 'twilio-video';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(){
    connect('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzI0Yjk1NDQwN2E0NTg3ZDBjNzE0YjMxNGMxZTI0YjkxLTE1OTQ5MDI1NDUiLCJpc3MiOiJTSzI0Yjk1NDQwN2E0NTg3ZDBjNzE0YjMxNGMxZTI0YjkxIiwic3ViIjoiQUNhYjhiMTA4NmUyOWZlMzc5MTE4YzcwYjM2OTRkMGRkYyIsImV4cCI6MTU5NDkwNjE0NSwiZ3JhbnRzIjp7ImlkZW50aXR5IjoibWFuaXNoIiwidmlkZW8iOnsicm9vbSI6Ik9ua28gcGVyc29uYWwgcm9vbSJ9fX0.IwmShXGDySO7-RVQ2uKXUVXYaMmygebR-J2lcMK6Go0', { name:'onko personal room' }).then(room => {
      console.log(`Successfully joined a Room: ${room}`);
      room.on('participantConnected', participant => {
        console.log(`A remote Participant connected: ${participant}`);
      });
    }, error => {
      console.error(`Unable to connect to Room: ${error.message}`);
    }); 
  }
}
