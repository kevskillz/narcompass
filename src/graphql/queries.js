/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      phoneNumber
      age
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: TableUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        phoneNumber
        age
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getLocation = /* GraphQL */ `
  query GetLocation($id: ID!) {
    getLocation(id: $id) {
      id
      longitude
      latitude
      timestamp
      __typename
    }
  }
`;
export const listLocations = /* GraphQL */ `
  query ListLocations(
    $filter: TableLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        longitude
        latitude
        timestamp
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getOverdoses = /* GraphQL */ `
  query GetOverdoses($id: ID!) {
    getOverdoses(id: $id) {
      id
      victim_id
      helper_ids
      timestamp
      active
      __typename
    }
  }
`;
export const listOverdoses = /* GraphQL */ `
  query ListOverdoses(
    $filter: TableOverdosesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOverdoses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        victim_id
        helper_ids
        timestamp
        active
        __typename
      }
      nextToken
      __typename
    }
  }
`;
