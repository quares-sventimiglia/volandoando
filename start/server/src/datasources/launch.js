const { RESTDataSource } = require('apollo-datasource-rest')

class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v2/';
  }

  async getAllLaunches() {
    const response = await this.get('launches');
    return Array.isArray(response)
      ? response.map(launch => this.launchReducer(launch))
      : [];
  }

  async getLaunchById({launchId}) {
    const response = await this.get('launches', {flight_number : launchId})
    return this.launchReducer(response[0])
  }

  getLaunchesByIds({launchIds}) {
    return Promise.all(
      launchIds.map(launchId => this.getLaunchById({ launchId }))
    )
  }

  launchReducer(launch) {
    return {
      id: launch.flight_number || 0,
      site: launch.launch_site && launch.launch_site.site_name,
      cursor: launch.launch_date_unix,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch,
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
      },
    }
  }
}

module.exports = LaunchAPI;

//RESTDataSource almacena en cache las respuestas de los recursos rest sin configuracion adicional.
/**}
 * This.get => envia un get solicitud al endpoint y almacena la respuesta en response
 * this.launchReducer => para transformar cada lanzamiento devuelto al formato esperado por nuestro esquema
 */