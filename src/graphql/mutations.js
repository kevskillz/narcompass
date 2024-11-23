/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      phoneNumber
      age
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      phoneNumber
      age
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      id
      name
      phoneNumber
      age
      __typename
    }
  }
`;
export const createLocation = /* GraphQL */ `
  mutation CreateLocation($input: CreateLocationInput!) {
    createLocation(input: $input) {
      id
      longitude
      latitude
      timestamp
      __typename
    }
  }
`;
export const updateLocation = /* GraphQL */ `
  mutation UpdateLocation($input: UpdateLocationInput!) {
    updateLocation(input: $input) {
      id
      longitude
      latitude
      timestamp
      __typename
    }
  }
`;
export const deleteLocation = /* GraphQL */ `
  mutation DeleteLocation($input: DeleteLocationInput!) {
    deleteLocation(input: $input) {
      id
      longitude
      latitude
      timestamp
      __typename
    }
  }
`;
export const createOverdoses = /* GraphQL */ `
  mutation CreateOverdoses($input: CreateOverdosesInput!) {
    createOverdoses(input: $input) {
      id
      victim_id
      helper_ids
      timestamp
      active
      __typename
    }
  }
`;
export const updateOverdoses = /* GraphQL */ `
  mutation UpdateOverdoses($input: UpdateOverdosesInput!) {
    updateOverdoses(input: $input) {
      id
      victim_id
      helper_ids
      timestamp
      active
      __typename
    }
  }
`;
export const deleteOverdoses = /* GraphQL */ `
  mutation DeleteOverdoses($input: DeleteOverdosesInput!) {
    deleteOverdoses(input: $input) {
      id
      victim_id
      helper_ids
      timestamp
      active
      __typename
    }
  }
`;
