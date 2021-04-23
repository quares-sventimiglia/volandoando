const { DataSource } = require("apollo-datasource");
const isEmail = require("isemail");

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async findOrCreateUser({ email: emailArg } = {}) {
    const email =
      this.context && this.context.user ? this.context.user.email : emailArg;
    if (!email || !isEmail.validate(email)) return null;

    const users = await this.store.users.findOrCreate({ where: { email } });
    return users && users[0] ? users[0] : null;
  }

  async findUser(email) {
    const user = await this.store.users.findOne({ where: { email } });
    return user;
  }

  async createUser({ email, password, name, token }) {
    const info = await this.store.users.create({
      name,
      email,
      password,
      token,
    });
    return info.dataValues;
  }

  async bookTrips({ launchIds }) {
    const userId = 11;
    if (!userId) return;

    let results = [];

    for (const launchId of launchIds) {
      const res = await this.bookTrip({ launchId });
      if (res) results.push(res);
    }

    return results;
  }

  async bookTrip({ launchId }) {
    const userId = this.context.userToken.id;
    const res = await this.store.trips.findOrCreate({
      where: { userId, launchId },
    });
    return res && res.length ? res[0].get() : false;
  }

  async cancelTrip({ launchId }) {
    const userId = this.context.userToken.id;
    return !!this.store.trips.destroy({ where: { userId, launchId } });
  }

  async getLaunchIdsByUser() {
    const userId = this.context.userToken.id;
    const found = await this.store.trips.findAll({
      where: { userId },
    });
    return found && found.length
      ? found.map((l) => l.dataValues.launchId).filter((l) => !!l)
      : [];
  }

  async isBookedOnLaunch({ launchId }) {
    if (!this.context || !this.context.user) return false;
    const userId = this.context.userToken.id;
    const found = await this.store.trips.findAll({
      where: { userId, launchId },
    });
    return found && found.length > 0;
  }

  async addLaunch({ launchId, userId }) {
    const didUserBookFlight = await this.store.trips.findOne({
      where: {launchId, userId}
    })
    if(didUserBookFlight) return null
    
    const res = await this.store.trips.create({ userId, launchId });
    return res.dataValues
  }

  async getLaunchesId (userId) {
    const res = await this.store.trips.findAll({where: {userId}})
    const launchId = res.map( id => id.dataValues.launchId )
    return launchId
  }

  async removeLaunch ({userId, launchId}) {
    const wasRemoved = await this.store.trips.destroy({ where: { userId, launchId } });
    console.log("WAS REMOVED", wasRemoved);
    return wasRemoved
  }
}

module.exports = UserAPI;
