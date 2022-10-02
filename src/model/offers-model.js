export default class OffersModel {
  #offers = [];
  #apiService = null;

  constructor(apiService) {
    this.#apiService = apiService;
  }

  init = async () => {
    try {
      this.#offers = await this.#apiService.offers;
    } catch (err) {
      this.#offers = [];
      throw Error(err.message);
    }
  };

  get offers() {
    return this.#offers;
  }
}
