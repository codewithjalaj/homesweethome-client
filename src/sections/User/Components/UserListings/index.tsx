import React from 'react';
import { List, Typography } from 'antd';
import { ListingCard } from '../../../../lib/components';
import { User } from '../../../../lib/graphql/queries/User/__generated__/User';

interface Props {
	userListings: User['user']['listings'];
	listingsPage: number;
	limit: number;
	viewerIsUser: boolean;
	setListingsPage: (page: number) => void;
	refetch: () => void;
}

const { Paragraph, Title } = Typography;

export const UserListings = ({ userListings, listingsPage, setListingsPage, limit, viewerIsUser, refetch }: Props) => {
	const { total, result } = userListings;

	const userListingsList = (
		<List
			grid={{
				gutter: 8,
				xs: 1,
				sm: 2,
				lg: 4,
				xl: 4,
			}}
			dataSource={result}
			locale={{ emptyText: "User doesn't have any listings yet!" }}
			pagination={{
				position: 'top',
				current: listingsPage,
				total,
				defaultPageSize: limit,
				hideOnSinglePage: true,
				showLessItems: true,
				onChange: (page: number) => setListingsPage(page),
			}}
			renderItem={(userListing) => (
				<List.Item>
					<ListingCard refetch={refetch} viewerIsUser={viewerIsUser} listing={userListing} />
				</List.Item>
			)}
		/>
	);

	return (
		<div className="user-listings">
			<Title level={4} className="user-listings__title">
				Listings
			</Title>
			<Paragraph className="user-listings__description">
				Currently hosted listings which are available for booking.
			</Paragraph>
			{userListingsList}
		</div>
	);
};
