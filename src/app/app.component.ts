import { Component, OnInit } from "@angular/core";
import { connect, createLocalVideoTrack } from "twilio-video";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    connect(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzM1MGFkMDIxMGUyYThiMDY1OWExNGM5YjMwZWUwYWM1LTE1OTQ5NjUzMzMiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJhZG1pbkBnbWFpbC5jb20iLCJ2aWRlbyI6eyJyb29tIjoiT25rbyBwZXJzb25hbCByb29tIn19LCJpYXQiOjE1OTQ5NjUzMzMsImV4cCI6MTU5NDk2ODkzMywiaXNzIjoiU0szNTBhZDAyMTBlMmE4YjA2NTlhMTRjOWIzMGVlMGFjNSIsInN1YiI6IkFDYWI4YjEwODZlMjlmZTM3OTExOGM3MGIzNjk0ZDBkZGMifQ.YxEFbB6WNGptKjG-FD7bxwo5sDJvfSorGG8WEemBtHE",
      { name: "onko personal room" }
    ).then(
      (room) => {
        console.log(`Successfully joined a Room: ${room}`);
        room.on("participantConnected", (participant) => {
          console.log(`A remote Participant connected: ${participant}`);

          console.log(`Participant "${participant.identity}" connected`);

          participant.tracks.forEach((publication) => {
            if (publication.isSubscribed) {
              const track = publication.track;
              document
                .getElementById("remote-media-div")
                .appendChild(track.attach());
            }
          });

          participant.on("trackSubscribed", (track) => {
            document
              .getElementById("remote-media-div")
              .appendChild(track.attach());
          });
        });

        room.localParticipant.audioTracks.forEach((publication) => {
          publication.track.enable();
        });

        room.localParticipant.videoTracks.forEach((publication) => {
          publication.track.enable();
        });
        room.participants.forEach((participant) => {
          participant.tracks.forEach((publication) => {
            if (publication.isSubscribed) {
              this.handleTrackDisabled(publication.track);
            }
            publication.on("subscribed", this.handleTrackDisabled);
          });
        });
      },
      (error) => {
        console.error(`Unable to connect to Room: ${error.message}`);
      }
    );

    createLocalVideoTrack().then((track) => {
      const localMediaContainer = document.getElementById("local-media");
      localMediaContainer.appendChild(track.attach());
    });
  }

  handleTrackDisabled(track) {
    track.on("disabled", () => {
      /* Hide the associated <video> element and show an avatar image. */
    });
  }
}
