import * as queries from './graphql/queries'
import * as mutations from './graphql/mutations'


/**
 * Retrieves user information by ID.
 * @param {object} client - The AWS AppSync client.
 * @param {object} data req: id (str) | opt: helper_id (str), active (bool), remove_index (int), timestamp (int)
 */
export async function appendOrRemoveHelpers(client, data) {
    
    try {
        const res = await client.graphql({
            query: mutations.updateOverdoses,
            variables: {
                input: data
            }
        });
        const ret = res.data.updateOverdoses;
        return ret;
      } catch (err) {
        console.error(err);
        return null;
      }
}

/**
 * Retrieves user information by ID.
 * @param {object} client - The AWS AppSync client.
 * @param {object} data req: id (str) | opt: latitude (int), longitude (int), timestamp (int)
 */
export async function updateLocation(client, data) {
    
    try {
        const res = await client.graphql({
            query: mutations.updateLocation,
            variables: {
                input: data
            }
        });
        const ret = res.data.updateLocation;
        return ret;
      } catch (err) {
        console.error(err);
        return null;
      }
}

/**
 * Retrieves user information by ID.
 * @param {object} client - The AWS AppSync client.
 * @param {object} data req: id (str) | opt: age (int), name (str), phoneNumber (str)
 */
export async function updateUser(client, data) {
    
    try {
        const res = await client.graphql({
            query: mutations.updateUser,
            variables: {
                input: data
            }
        });
        const ret = res.data.updateUser;
        return ret;
      } catch (err) {
        console.error(err);
        return null;
      }
}

/**
 * Retrieves user information by ID.
 * @param {object} client - The AWS AppSync client.
 * @param {object} data - Input data containing the user ID.
 *                        { id: string }
 * @returns {Promise<object|null>} - The user data or null if an error occurs.
 */
export async function getUser(client, data) {
  try {
    const res = await client.graphql({
      query: queries.getUser,
      variables: data
    });
    const ret = res.data.getUser;
    return ret;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Retrieves a list of users based on optional filtering parameters.
 * @param {object} client - The AWS AppSync client.
 * @param {object} data - Input data containing optional filtering, limit, and nextToken.
 *                        { filter: TableUserFilterInput, limit: number, nextToken: string }
 * @returns {Promise<object|null>} - The list of users or null if an error occurs.
 */
export async function listUsers(client, data) {
  try {
    const res = await client.graphql({
      query: queries.listUsers,
      variables: {
        input: data
      }
    });
    const ret = res.data.listUsers.items;
    return ret;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Retrieves location information by ID.
 * @param {object} client - The AWS AppSync client.
 * @param {object} data - Input data containing the location ID.
 *                        { id: string }
 * @returns {Promise<object|null>} - The location data or null if an error occurs.
 */
export async function getLocation(client, data) {
  try {
    const res = await client.graphql({
      query: queries.getLocation,
      variables: data
    });
    const ret = res.data.getLocation;
    return ret;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Retrieves a list of locations based on optional filtering parameters.
 * @param {object} client - The AWS AppSync client.
 * @param {object} data - Input data containing optional filtering, limit, and nextToken.
 *                        { filter: TableLocationFilterInput, limit: number, nextToken: string }
 * @returns {Promise<object|null>} - The list of locations or null if an error occurs.
 */
export async function listLocations(client, data) {
  try {
    const res = await client.graphql({
      query: queries.listLocations,
      variables: {
        input: data
      }
    });
    const ret = res.data.listLocations.items;
    return ret;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Retrieves overdose information by ID.
 * @param {object} client - The AWS AppSync client.
 * @param {object} data - Input data containing the overdose ID.
 *                        { id: string }
 * @returns {Promise<object|null>} - The overdose data or null if an error occurs.
 */
export async function getOverdose(client, data) {
  try {
    const res = await client.graphql({
      query: queries.getOverdoses,
      variables: data
    });
    const ret = res.data.getOverdoses;
    return ret;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Retrieves a list of overdoses based on optional filtering parameters.
 * @param {object} client - The AWS AppSync client.
 * @param {object} data - Input data containing optional filtering, limit, and nextToken.
 *                        { filter: TableOverdosesFilterInput, limit: number, nextToken: string }
 * @returns {Promise<object|null>} - The list of overdoses or null if an error occurs.
 */
export async function listOverdoses(client, data) {
  try {
    const res = await client.graphql({
      query: queries.listOverdoses,
      variables: {
        input: data
      }
    });
    const ret = res.data.listOverdoses.items;
    return ret;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Creates a new user.
 * @param {object} client - The AWS AppSync client.
 * @param {object} data - Input data for creating a user.
 *                        { name: string, phoneNumber: string, age: number }
 * @returns {Promise<object|null>} - The created user data or null if an error occurs.
 */
export async function createUser(client, data) {
  try {
    const res = await client.graphql({
      query: mutations.createUser,
      variables: {
        input: data
      }
    });
    const ret = res.data.createUser;
    return ret;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Deletes an existing user.
 * @param {object} client - The AWS AppSync client.
 * @param {object} data - Input data for deleting a user.
 *                        { id: string }
 * @returns {Promise<object|null>} - The deleted user data or null if an error occurs.
 */
export async function deleteUser(client, data) {
  try {
    const res = await client.graphql({
      query: mutations.deleteUser,
      variables: {
        input: data
      }
    });
    const ret = res.data.deleteUser;
    return ret;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Creates a new location.
 * @param {object} client - The AWS AppSync client.
 * @param {object} data - Input data for creating a location.
 *                        { id: string, longitude: number, latitude: number, timestamp: string }
 * @returns {Promise<object|null>} - The created location data or null if an error occurs.
 */
export async function createLocation(client, data) {
  try {
    const res = await client.graphql({
      query: mutations.createLocation,
      variables: {
        input: data
      }
    });
    const ret = res.data.createLocation;
    return ret;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Deletes an existing location.
 * @param {object} client - The AWS AppSync client.
 * @param {object} data - Input data for deleting a location.
 *                        { id: string }
 * @returns {Promise<object|null>} - The deleted location data or null if an error occurs.
 */
export async function deleteLocation(client, data) {
  try {
    const res = await client.graphql({
      query: mutations.deleteLocation,
      variables: {
        input: data
      }
    });
    const ret = res.data.deleteLocation;
    return ret;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Creates a new overdose entry.
 * @param {object} client - The AWS AppSync client.
 * @param {object} data - Input data for creating an overdose entry.
 *                        { id: string, victim_id: string, timestamp: int, active: boolean }
 * @returns {Promise<object|null>} - The created overdose data or null if an error occurs.
 */
export async function createOverdose(client, data) {
  try {
    const res = await client.graphql({
      query: mutations.createOverdoses,
      variables: {
        input: data
      }
    });
    const ret = res.data.createOverdoses;
    return ret;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Deletes an existing overdose entry.
 * @param {object} client - The AWS AppSync client.
 * @param {object} data - Input data for deleting an overdose entry.
 *                        { id: string }
 * @returns {Promise<object|null>} - The deleted overdose data or null if an error occurs.
 */
export async function deleteOverdose(client, data) {
  try {
    const res = await client.graphql({
      query: mutations.deleteOverdoses,
      variables: {
        input: data
      }
    });
    const ret = res.data.deleteOverdoses;
    return ret;
  } catch (err) {
    console.error(err);
    return null;
  }
}
