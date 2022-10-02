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
    }
  };

  get destinations() {
    return this.#destinations;
  }
}
