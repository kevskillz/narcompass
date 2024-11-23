/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($id: ID, $name: String) {
    onCreateUser(id: $id, name: $name) {
      id
      name
      phoneNumber
      age
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($id: ID, $name: String) {
    onUpdateUser(id: $id, name: $name) {
      id
      name
      phoneNumber
      age
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($id: ID, $name: String) {
    onDeleteUser(id: $id, name: $name) {
      id
      name
      phoneNumber
      age
      __typename
    }
  }
`;
export const onCreateLocation = /* GraphQL */ `
  subscription OnCreateLocation(
    $id: ID
    $longitude: Float
    $latitude: Float
    $timestamp: AWSTimestamp
  ) {
    onCreateLocation(
      id: $id
      longitude: $longitude
      latitude: $latitude
      timestamp: $timestamp
    ) {
      id
      longitude
      latitude
      timestamp
      __typename
    }
  }
`;
export const onUpdateLocation = /* GraphQL */ `
  subscription OnUpdateLocation(
    $id: ID
    $longitude: Float
    $latitude: Float
    $timestamp: AWSTimestamp
  ) {
    onUpdateLocation(
      id: $id
      longitude: $longitude
      latitude: $latitude
      timestamp: $timestamp
    ) {
      id
      longitude
      latitude
      timestamp
      __typename
    }
  }
`;
export const onDeleteLocation = /* GraphQL */ `
  subscription OnDeleteLocation(
    $id: ID
    $longitude: Float
    $latitude: Float
    $timestamp: AWSTimestamp
  ) {
    onDeleteLocation(
      id: $id
      longitude: $longitude
      latitude: $latitude
      timestamp: $timestamp
    ) {
      id
      longitude
      latitude
      timestamp
      __typename
    }
  }
`;
export const onCreateOverdoses = /* GraphQL */ `
  subscription OnCreateOverdoses(
    $id: ID
    $victim_id: ID
    $helper_ids: [ID]
    $timestamp: AWSTimestamp
    $active: Boolean
  ) {
    onCreateOverdoses(
      id: $id
      victim_id: $victim_id
      helper_ids: $helper_ids
      timestamp: $timestamp
      active: $active
    ) {
      id
      victim_id
      helper_ids
      timestamp
      active
      __typename
    }
  }
`;
export const onUpdateOverdoses = /* GraphQL */ `
  subscription OnUpdateOverdoses(
    $id: ID
    $helper_id: ID
    $active: Boolean
    $remove_index: Int
  ) {
    onUpdateOverdoses(
      id: $id
      helper_id: $helper_id
      active: $active
      remove_index: $remove_index
    ) {
      id
      victim_id
      helper_ids
      timestamp
      active
      __typename
    }
  }
`;
export const onDeleteOverdoses = /* GraphQL */ `
  subscription OnDeleteOverdoses(
    $id: ID
    $victim_id: ID
    $timestamp: AWSTimestamp
    $active: Boolean
  ) {
    onDeleteOverdoses(
      id: $id
      victim_id: $victim_id
      timestamp: $timestamp
      active: $active
    ) {
      id
      victim_id
      helper_ids
      timestamp
      active
      __typename
    }
  }
`;
