export default class DestinationModel {
  #destinations = [];
  #apiService = null;

  constructor(apiService) {
    this.#apiService = apiService;
  }

  init = async () => {
    try {
      this.#destinations = await this.#apiService.destinations;
    } catch (err) {
      this.#destinations = [];
      throw Error(err.message);
    }
  };

  get destinations() {
    return this.#destinations;
  }
}
