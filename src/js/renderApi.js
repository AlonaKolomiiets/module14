import refs from './refs.js';
import apiService from './apiService.js';
import template from '../templates/template.hbs';
//import debounce from 'lodash.debounce';
import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';
import InfiniteScroll from 'infinite-scroll';
import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
defaultModules.set(PNotifyMobile, {});

class RenderIllustration {
  constructor() {
    this.page = 1;
    this.perPage = 12;
    this.query = '';
  }
  newQuery(query) {
    this.page = 1;
    this.query = query;
    this.fetchApi();
  }
  showMore() {
    this.page += 1;
    this.fetchApi();
  }
  async fetchApi() {
    const { hits } = await apiService.getIllustration(this.query);
    if (!hits.length) {
      return error({
        text: 'Not found...try again...',
        hide: true,
        delay: 2000,
      });
    } else {
      const videos = template(hits);
      refs.galleryList.insertAdjacentHTML('beforeend', videos);
      console.log(hits);
    }
  }
}

const newRender = new RenderIllustration();

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  refs.galleryList.innerHTML = '';
  newRender.newQuery(event.target.elements.query.value);
});

refs.galleryList.addEventListener('click', event => {
  console.log(event.target.nodeName);
  if (event.target.nodeName === 'VIDEO') {
    let srcModal = event.target.dataset.src;
    const instance = basicLightbox.create(`
      <div class="modal">
          <video src="${srcModal}" controls="controls"> </video>
      </div>
  `);

    instance.show();
  }
});

const infScroll = new InfiniteScroll(refs.galleryList, {
  // options
  path: '{{#}}',
  history: false,
});
infScroll.on('scrollThreshold', () => {
  newRender.showMore();
});
