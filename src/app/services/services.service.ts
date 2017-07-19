import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class ServicesService {
  services = new BehaviorSubject<any>(this.getDefaultServices());

  constructor(
  ) {
  }




  get servicesAsync() {
    return this.services.asObservable().distinctUntilChanged();
  }

  setServices(a) {
    this.services.next(a);
  }

  getDefaultServices() {
    return [
      {
        summary: 'Relaxation massage',
        description: 'De-stress and unwind during this full-body massage with light to medium pressure. This massage will soothe your body and mind, transporting you to a tranquil state of relaxation.',
        price: '80',
        time: '60',
        img: './assets/services/relax.jpg'
      },
      {
        summary: 'Deep tissue massage',
        description: 'Find relief from chronic pain, tension and tightness caused by injury or overworked muscles. This therapeutic massage focuses on specific problem areas, with deep pressure applied during the massage. Your massage therapist will adjust the pressure to accommodate your comfort level. This service is beneficial for those with chronic muscle tension and pain.',
        price: '80',
        time: '60',
        img: './assets/services/deep_tissue.jpg'
      },
      {
        summary: 'Hot stone massage',
        description: 'The healing power of heat is combined with traditional massage techniques. Tension melts away as warm stones are used over the entire body, radiating deep into tight muscles and bringing your body into a state of deep relaxation.',
        price: '110',
        time: '60',
        img: './assets/services/hot_stone.jpg'
      },
      {
        summary: 'Focus massage',
        description: 'Refresh with this focused 30 minute therapeutic massage. Your therapist will work on a specific area of tension.  For many people this is the shoulders, neck and upper back.  This is a great service if you are limited on time or don’t want a full-body massage.',
        priceMin: '55',
        time: '30',
        img: './assets/services/focus.jpg'
      },
      {
        summary: 'Sport massage',
        description: 'Improve your athletic performance and reduce the risk of injury with a combination of deep tissue massage, stretching and compression techniques. This massage reduces muscle pain and joint soreness, increases flexibility and speeds recovery from injuries or overworked muscles.',
        price: '80',
        time: '60',
        img: './assets/services/sport.jpg'
      },
      {
        summary: 'Energy balancing therapy',
        description: 'Restore the equilibrium of your body and mind. This specialized treatment brings balance by clearing up stagnant areas in your energy field through Reiki/energy work and massage techniques. The healing art of energy work is practiced in many cultures around the world for stress reduction, relaxation and promotion of healing.',
        price: '80',
        time: '60',
        img: './assets/services/energy_balancing.jpg'
      },
      {
        summary: 'Pregnancy massage',
        description: 'Find relief and relaxation during all stages of your pregnancy. Massage during pregnancy is a gentle and nurturing way to alleviate the discomfort associated with this joyful, yet physically challenging time in a woman’s life. A specially designed table allows you to lie face down while supporting the belly, helping you feel secure and comfortable. Receiving massage during pregnancy promotes health and well-being for you and your baby',
        price: '60',
        time: '20',
        img: './assets/services/pregnancy.jpg'
      }
    ]
  }
}













