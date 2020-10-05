/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ListingType {
  APARTMENT = "APARTMENT",
  HOUSE = "HOUSE",
}

export enum ListingsFilter {
  NUM_OF_GUESTS_1 = "NUM_OF_GUESTS_1",
  NUM_OF_GUESTS_2 = "NUM_OF_GUESTS_2",
  NUM_OF_GUESTS_GT_2 = "NUM_OF_GUESTS_GT_2",
  PRICE_HIGH_TO_LOW = "PRICE_HIGH_TO_LOW",
  PRICE_LOW_TO_HIGH = "PRICE_LOW_TO_HIGH",
}

export interface CreateBookingInput {
  id: string;
  source: string;
  checkIn: string;
  checkOut: string;
}

export interface DeleteListingInput {
  id: string;
}

export interface HostListingInput {
  id?: string | null;
  title: string;
  description: string;
  image: string;
  type: ListingType;
  address: string;
  price: number;
  numOfGuests: number;
}

export interface LogInInput {
  code: string;
}

export interface StripeConnectInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
