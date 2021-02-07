import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-vjs-player',
  template: `
    <video #target class="video-js" controls playsinline preload="none"></video>
  `,
  styleUrls: [
    './vjs-player.component.css'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class VjsPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', {static: true}) target: ElementRef;
  // see options: https://github.com/videojs/video.js/blob/mastertutorial-options.html
  @Input() options: {
    fluid: boolean,
    aspectRatio: string,
    autoplay: boolean,
    sources: {
      src: string,
      type: string,
    }[],
  };
  player: videojs.Player;

  constructor(
    private elementRef: ElementRef,
  ) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // instantiate Video.js
    // tslint:disable-next-line:typedef
    // tslint:disable-next-line:typedef
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }
}
