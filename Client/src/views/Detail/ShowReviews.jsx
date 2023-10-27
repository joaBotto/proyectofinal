import { UserOutlined, HeartFilled } from "@ant-design/icons";
import { Avatar, Carousel, Rate } from "antd";

function ShowReviews({ property }) {
	return (
		<div>
			{property.reviews.length > 0 ? (
				<Carousel autoplay>
					{property.reviews.map((review, index) => (
						<div key={index}>
							<p className="text-xl text-blue font-onest font-extrabold pt-3 px-5">
								PROPERTY REVIEW
							</p>
							<div className="flex flex-row justify-between px-5">
								<Rate
									className="text-cyan"
									disabled
									defaultValue={review.calification}
									character={<HeartFilled />}
									allowHalf
								/>
								<p className="text-blue text-xl font-onest font-bold">
									{review.calification}
									<HeartFilled />
								</p>
							</div>
							<div className="flex flex-col md:flex-row items-center pl-5">
								<div className="flex  rounded-full">
									{review.guestImage ? (
										<Avatar
											size={{
												xs: 24,
												sm: 32,
												md: 40,
												lg: 64,
												xl: 80,
												xxl: 100,
											}}
											src={review.guestImage}
										/>
									) : (
										<Avatar
											size={{
												xs: 24,
												sm: 32,
												md: 40,
												lg: 64,
												xl: 80,
												xxl: 100,
											}}
											icon={<UserOutlined />}
										/>
									)}
								</div>
								<p className="text-xs text-blue font-noto text-left font-light py-2 px-2">
									{review.description}
								</p>
							</div>
						</div>
					))}
				</Carousel>
			) : (
				<p className="text-xl text-blue font-onest font-extrabold pt-3 px-5">
					NO REVIEWS FOR THIS PROPERTY
				</p>
			)}
		</div>
	);
}

export default ShowReviews;
