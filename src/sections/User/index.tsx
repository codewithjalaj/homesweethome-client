import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { USER } from '../../lib/graphql/queries/User';
import { User as UserData, UserVariables } from '../../lib/graphql/queries/User/__generated__/User';
import { Layout, Col, Row } from 'antd';
import { PageSkeleton, ErrorBanner } from '../../lib/components';
import { UserProfile, UserListings, UserBookings } from './Components';
import useViewerState from '../../lib/context/useViewerState';

const { Content } = Layout;
const PAGE_LIMIT = 4;

export const User = () => {
	const { viewer } = useViewerState(); // global viewer state
	const { id: idUrlParam } = useParams(); // this is "/user/:id"

	const [listingsPage, setListingsPage] = useState(1);
	const [bookingsPage, setBookingsPage] = useState(1);

	const { data, error, loading } = useQuery<UserData, UserVariables>(USER, {
		variables: {
			id: idUrlParam,
			limit: PAGE_LIMIT,
			bookingsPage,
			listingsPage,
		},
	});

	const user = data ? data.user : null;
	const viewerIsUser = viewer.id === idUrlParam;

	const userListings = user ? user.listings : null;
	const userBookings = user ? user.bookings : null;

	const userProfileElement = user ? <UserProfile user={user} viewerIsUser={viewerIsUser} /> : null;

	const userListingsElement = userListings ? (
		<UserListings
			userListings={userListings}
			listingsPage={listingsPage}
			limit={PAGE_LIMIT}
			setListingsPage={setListingsPage}
		/>
	) : null;

	const userBookingsElement = userListings ? (
		<UserBookings
			userBookings={userBookings}
			bookingsPage={bookingsPage}
			limit={PAGE_LIMIT}
			setBookingsPage={setBookingsPage}
		/>
	) : null;

	if (loading) {
		return (
			<Content className="user">
				<PageSkeleton />
			</Content>
		);
	}

	if (error) {
		return (
			<Content className="user">
				<ErrorBanner description="This user may not exist or we've encountered an error. Please try again soon." />
				<PageSkeleton />
			</Content>
		);
	}

	return (
		<Content className="user">
			<Row gutter={12} justify="space-between">
				<Col xs={24}>{userProfileElement}</Col>
				<Col xs={24}>
					{userListingsElement}
					{userBookingsElement}
				</Col>
			</Row>
		</Content>
	);
};
