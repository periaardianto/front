import { navigationMock } from '../../../../tests/navigation-service-mock.spec';

1
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, DebugElement, EventEmitter, Input, Output } from '@angular/core';

import { BoostNewsfeed } from './boost-newsfeed';
import { FormsModule } from '@angular/forms';
import { Client } from '../../../services/api/client';
import { By } from '@angular/platform-browser';
import { clientMock } from '../../../../tests/client-mock.spec';
import { MaterialMock } from '../../../../tests/material-mock.spec';
import { MaterialSliderMock } from '../../../../tests/material-slider.mock.spec';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Navigation } from '../../../services/navigation';
import { mindsTitleMock } from '../../../../tests/minds-title-service-mock.spec';
import { MindsTitle } from '../../../services/ux/title';

@Component({
  selector: 'minds-card-video',
  template: ''
})
class MindsCardVideoMock {
  @Input() object: any;
}

@Component({
  selector: 'minds-card-image',
  template: ''
})
class MindsCardImageMock {
  @Input() object: any;
}

@Component({
  selector: 'minds-activity',
  template: ''
})
class MindsActivityMock {
  @Input() object: any;
  @Input() boostToggle: boolean;
  @Output() onViewed: EventEmitter<any> = new EventEmitter<any>();
}

@Component({
  selector: 'infinite-scroll',
  template: ''
})
class InfiniteScrollMock {
  @Input() distance;
  @Input() on;
  @Input() inProgress;
  @Input() moreData;
  @Input() hideManual;

  @Output('loadHandler') load: EventEmitter<any> = new EventEmitter<any>();
}

@Component({
  selector: 'minds-card-user',
  template: ''
})
class MindsCardUserMock {
  @Input() object: any;
}

@Component({
  selector: 'm-modal-invite',
  template: ''
})
class MindsModalInviteMock {
  @Input() open: any;
  @Output() closed: EventEmitter<any> = new EventEmitter<any>();
}

@Component({
  selector: 'm-tagcloud',
  template: ''
})
class TagcloudMock {
  load() {

  }
}

@Component({
  selector: 'm-ads-boost',
  template: ''
})
class AdsBoostMock {
  @Input() handler;
  @Input() limit;
}


fdescribe('BoostNewsfeed ', () => {

  let comp: BoostNewsfeed;
  let fixture: ComponentFixture<BoostNewsfeed>;

  const owner = {
    'guid': '123',
    'type': 'user',
    'subtype': false,
    'time_created': '1500037446',
    'time_updated': false,
    'container_guid': '0',
    'owner_guid': '0',
    'site_guid': false,
    'access_id': '2',
    'name': 'minds',
    'username': 'minds',
    'language': 'en',
    'icontime': false,
    'legacy_guid': false,
    'featured_id': false,
    'banned': 'no',
    'website': '',
    'briefdescription': 'test',
    'dob': '',
    'gender': '',
    'city': '',
    'boostProPlus': false,
    'fb': false,
    'mature': 0,
    'monetized': '',
    'signup_method': false,
    'social_profiles': [],
    'feature_flags': false,
    'programs': ['affiliate'],
    'plus': false,
    'verified': false,
    'disabled_boost': false,
    'categories': ['news', 'film', 'spirituality'],
    'wire_rewards': null,
    'subscribed': false,
    'subscriber': false,
    'subscribers_count': 1,
    'subscriptions_count': 1,
    'impressions': 337,
    'boost_rating': '2'
  };


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        MindsActivityMock,
        MindsCardUserMock,
        MindsModalInviteMock,
        TagcloudMock,
        AdsBoostMock,
        InfiniteScrollMock,
        MaterialMock,
        BoostNewsfeed
      ], // declare the test component
      imports: [
        RouterTestingModule,
        NgCommonModule,
        FormsModule
      ],
      providers: [
        { provide: Client, useValue: clientMock },
        { provide: Navigation, useValue: navigationMock },
        { provide: MindsTitle, useValue: mindsTitleMock }
      ]
    })
      .compileComponents();  // compile template and css
  }));

  // synchronous beforeEach
  beforeEach((done) => {
    jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
    jasmine.clock().uninstall();
    jasmine.clock().install();

    fixture = TestBed.createComponent(BoostNewsfeed);

    comp = fixture.componentInstance; // BoostNewsfeed  test instance

    clientMock.response = [];

    clientMock.response[`api/v1/boost/fetch/newsfeed`] = {
      "status": "success",
      "boosts": [
        {
          "guid": "754678041384325122",
          "type": "activity",
          "time_created": "1505305266",
          "time_updated": "1505305266",
          "container_guid": "732337264197111809",
          "owner_guid": "732337264197111809",
          "access_id": "2",
          "title": "",
          "blurb": "",
          "perma_url": "",
          "message": "a",
          "ownerObj": {
            "guid": "732337264197111809",
            "type": "user",
            "subtype": false,
            "time_created": "1499978809",
            "time_updated": false,
            "container_guid": "0",
            "owner_guid": "0",
            "site_guid": false,
            "access_id": "2",
            "name": "minds",
            "username": "minds",
            "language": "en",
            "icontime": "1500900053",
            "legacy_guid": false,
            "featured_id": false,
            "banned": "no",
            "website": "",
            "briefdescription": "test\n",
            "dob": "",
            "gender": "",
            "city": "",
            "boostProPlus": false,
            "fb": false,
            "mature": "0",
            "monetized": "",
            "signup_method": false,
            "social_profiles": [],
            "feature_flags": false,
            "programs": ["affiliate"],
            "plus": false,
            "verified": false,
            "disabled_boost": false,
            "categories": ["animals", "comedy", "education"],
            "chat": true,
            "subscribed": false,
            "subscriber": false,
            "subscriptions_count": "1",
            "impressions": "1765",
            "boost_rating": "2"
          },
          "containerObj": "",
          "thumbnail_src": "",
          "remind_object": "",
          "entity_guid": "",
          "featured": "",
          "featured_guid": "",
          "custom_type": "",
          "custom_data": "",
          "thumbs:up:count": 0,
          "thumbs:up:user_guids": [],
          "thumbs:down:count": 0,
          "thumbs:down:user_guids": "",
          "p2p_boosted": "",
          "mature": false,
          "monetized": "",
          "paywall": "",
          "edited": "",
          "comments_enabled": true,
          "wire_totals": { "points": "0", "money": "0" },
          "comments:count": 2,
          "impressions": 329,
          "reminds": 0,
          "wire_threshold": null,
          "boost_rejection_reason": -1,
          "spam": false,
          "deleted": false,
          "boosted": true,
          "boosted_guid": "759364947380539404"
        },
        {
          "guid": "759369784549707792",
          "type": "activity",
          "time_created": "1506423864",
          "time_updated": "1506423864",
          "container_guid": "732337264197111809",
          "owner_guid": "732337264197111809",
          "access_id": "2",
          "title": "",
          "blurb": false,
          "perma_url": false,
          "message": "ggjgjj",
          "ownerObj": {
            "guid": "732337264197111809",
            "type": "user",
            "subtype": false,
            "time_created": "1499978809",
            "time_updated": false,
            "container_guid": "0",
            "owner_guid": "0",
            "site_guid": false,
            "access_id": "2",
            "name": "minds asd",
            "username": "minds",
            "language": "en",
            "icontime": "1500900053",
            "legacy_guid": false,
            "featured_id": false,
            "banned": "no",
            "website": "",
            "briefdescription": "test\n",
            "dob": "",
            "gender": "",
            "city": "",
            "boostProPlus": false,
            "fb": false,
            "mature": "0",
            "monetized": "",
            "signup_method": false,
            "social_profiles": [],
            "feature_flags": false,
            "programs": ["affiliate"],
            "plus": false,
            "verified": false,
            "disabled_boost": false,
            "categories": [],
            "chat": true,
            "subscribed": false,
            "subscriber": false,
            "subscriptions_count": "1",
            "impressions": "2327",
            "boost_rating": "1",
            "spam": "0",
            "deleted": "0"
          },
          "containerObj": false,
          "thumbnail_src": false,
          "remind_object": false,
          "entity_guid": "759369724994785287",
          "featured": false,
          "featured_guid": false,
          "custom_type": "batch",
          "custom_data": [{
            "src": "http:\/\/dev.minds.io\/fs\/v1\/thumbnail\/759369724994785287",
            "href": "http:\/\/dev.minds.io\/media\/732337264197111809\/759369724994785287",
            "mature": false
          }],
          "thumbs:up:count": 0,
          "thumbs:up:user_guids": [],
          "thumbs:down:count": 0,
          "thumbs:down:user_guids": false,
          "p2p_boosted": false,
          "mature": false,
          "monetized": false,
          "paywall": "",
          "edited": "",
          "comments_enabled": true,
          "wire_totals": { "points": "0", "money": "0" },
          "comments:count": 0,
          "impressions": 96,
          "reminds": 0,
          "wire_threshold": null,
          "boost_rejection_reason": -1,
          "spam": false,
          "deleted": false,
          "boosted": true,
          "boosted_guid": "759855772854128645"
        }],
      "load-next": "761590045978136588"
    };

    spyOn(comp.session, 'isLoggedIn').and.returnValue(true);
    spyOn(comp.session, 'getLoggedInUser').and.returnValue(owner);

    fixture.detectChanges();

    if (fixture.isStable()) {
      done();
    } else {
      fixture.whenStable().then(() => {
        done();
      });
    }
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should\'ve called api/v1/boost/fetch/newsfeed on init', () => {
    expect(clientMock.get).toHaveBeenCalled();
    expect(clientMock.get.calls.mostRecent().args[0]).toContain('api/v1/boost/fetch/newsfeed');
  });

  it('when an activity fires the onViewed event, api/v1/boost/fetch/newsfeed/:boosted_guid should be called with put method', fakeAsync(()=> {
    tick();
    fixture.detectChanges();

    const activity: DebugElement = fixture.debugElement.query(By.css('.minds-list minds-activity:first-child'));
    activity.componentInstance.onViewed.emit(activity.componentInstance.object);

    fixture.detectChanges();

    expect(clientMock.put).toHaveBeenCalled();
    expect(clientMock.put.calls.mostRecent().args[0]).toBe('api/v1/boost/fetch/newsfeed/' + activity.componentInstance.object.boosted_guid);
  }));
});
