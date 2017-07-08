import 'rxjs/add/operator/map';
import { AbstractAPI } from './AbstractAPI'
import { Http } from '@angular/http';

/**
 * Make calls to kitsu api.
 *
 * @TODO: settings file with server endpoint. Example https://medium.com/@hasan.hameed/reading-configuration-files-in-angular-2-9d18b7a6aa4
 */
export abstract class KitsuAPI extends AbstractAPI {

  constructor(protected http: Http) {
      super(http)
  }

    public getData(response, callback) {
        var data = response.json();
        var data_data = data.data;
        // @WORKAROUND: add 'included' to data!
        // @TODO: refactor!
        data_data.included = data.included;
        return typeof(data_data[0]) != 'undefined' ? this.getEntities(data_data, callback) : callback(data_data);
    }

    public getEntities(data, callback) {
        let entities_processed = []
        for (let entity of data) {
            entities_processed.push(callback(entity));
        }
        return entities_processed;
    }

    public getList() {
        return this.makeRequestList();
    }

  protected makeRequestSingle(id, params = {}) {
      params['id'] = id;
      return this.http.get(this.buildUrl(params)).map(
        (res) => {
            return this.getData(res, this.convertEntity)
        }
      )
  }
  protected makeRequestList(params = {}) {
      return this.http.get(this.buildUrl(params)).map(
        (res) => {
            return this.getData(res, this.convertEntity)
        }
      )
  }

  abstract convertEntity(data)

}
