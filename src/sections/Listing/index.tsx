import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Moment } from 'moment';
import { useParams } from 'react-router-dom';
import { LISTING } from '../../lib/graphql/queries';
import { Listing as ListingData, ListingVariables } from '../../lib/graphql/queries/Listing/__generated__/Listing';
import { Layout, Row, Col } from 'antd';
import { PageSkeleton, ErrorBanner } from '../../lib/components';
import { ListingDetails, ListingBookings, ListingCreateBooking, ListingCreateBookingModal } from './components';

const PAGE_LIMIT = 3;
const { Content } = Layout;

interface Params {
	id: string;
}

export const Listing = () => {
	const { id } = useParams<Params>();
	const [bookingsPage, setBookingsPage] = useState(1);
	const [checkInDate, setCheckInDate] = useState<Moment | null>(null);
	const [checkOutDate, setCheckOutDate] = useState<Moment | null>(null);
	const [modalVisible, setModalVisible] = useState(false);

	const { data, loading, error, refetch } = useQuery<ListingData, ListingVariables>(LISTING, {
		variables: {
			id,
			bookingsPage,
			limit: PAGE_LIMIT,
		},
	});

	const refetchListing = async () => {
		await refetch();
	};

	const clearBookingData = () => {
		setCheckOutDate(null);
		setCheckInDate(null);
		setModalVisible(false);
	};

	if (loading) {
		return (
			<Content className="listings">
				<PageSkeleton />
			</Content>
		);
	}

	if (error) {
		return (
			<Content className="listings">
				<ErrorBanner description="This listing may not exist or we've encountered an error. Please try again." />
				<PageSkeleton />
			</Content>
		);
	}

	const listing = data ? data.listing : null;
	const listingBookings = listing ? listing.bookings : null;
	// const listingDetailsElement = listing ? <ListingDetails listing={listing} /> : null;

	return (
		<Content className="listings">
			<Row gutter={24} justify="space-between">
				<Col xs={24} lg={14}>
					{/* Listing Details */}
					{listing ? <ListingDetails listing={listing} /> : null}

					{/* Bookings for above listing, only visible to the owner */}
					{listingBookings ? (
						<ListingBookings
							limit={PAGE_LIMIT}
							setBookingsPage={setBookingsPage}
							bookingsPage={bookingsPage}
							listingBookings={listingBookings}
						/>
					) : null}
				</Col>
				<Col xs={24} lg={10}>
					{/* Booking form to book above listing */}
					{listing ? (
						<ListingCreateBooking
							host={listing.host}
							price={listing.price}
							bookingsIndex={listing.bookingsIndex}
							checkInDate={checkInDate}
							checkOutDate={checkOutDate}
							setCheckInDate={setCheckInDate}
							setCheckOutDate={setCheckOutDate}
							setModalVisible={setModalVisible}
						/>
					) : null}
				</Col>
			</Row>
			{listing && checkInDate && checkOutDate && (
				<ListingCreateBookingModal
					id={listing.id}
					clearBookingData={clearBookingData}
					refetchListing={refetchListing}
					price={listing.price}
					modalVisible={modalVisible}
					checkInDate={checkInDate}
					checkOutDate={checkOutDate}
					setModalVisible={setModalVisible}
				/>
			)}
		</Content>
	);
};
