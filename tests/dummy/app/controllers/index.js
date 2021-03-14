import Controller from '@ember/controller';

export default class IndexController extends Controller {
  get props () {
    return {
      '--r': {
        from: '0',
          to: '1turn'
      },
      '--tx': {
        from: '-100px',
          to: '500px'
      }
    }
  }
}
