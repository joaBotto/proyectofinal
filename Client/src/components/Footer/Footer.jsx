import React from "react";
import { CalendarDaysIcon, HeartIcon } from "@heroicons/react/24/outline";
import {
	WhatsAppOutlined,
	InstagramOutlined,
	GithubOutlined,
} from "@ant-design/icons";

export default function Footer() {
	return (
		<div className="relative isolate overflow-hidden bg-gradient-to-tr from-purple-100 via-indigo-300 to-indigo-500 py-8 sm:py-24 lg:p-16">
			<div className="mx-auto w-full overflow-hidden px-6 lg:px-20">
				<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
					<div className="max-w-xl lg:max-w-lg">
						<h2 className="font-onest text-xl font-bold tracking-tight text-violet sm:text-4xl">
							Subscribe to our platform so you don't miss any news :){" "}
						</h2>
						<p className="font-onest mt-4 text-lg leading-8 text-white">
							Be the first to find about new homes, new available dates, <br />{" "}
							and more!
						</p>
						<div className="mt-6 flex max-w-md gap-x-4">
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="min-w-0 flex-auto border-0 bg-white px-3.5 py-2 text-violet font-onest rounded-full shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
								placeholder="Enter your email"
							/>
							<button
								type="submit"
								className="flex-none font-onest rounded-full bg-violet px-3.5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-pink"
							>
								SUSCRIBE
							</button>
						</div>
					</div>
					<dl className="grid grid-cols-1 gap-x-11 gap-y-10 sm:grid-cols-2 lg:pt-2">
						<div className="flex flex-col items-start">
							<div className="rounded-full bg-white/5 p-2 ring-1 ring-white/10">
								<CalendarDaysIcon
									className="h-6 w-6 text-white"
									aria-hidden="true"
								/>
							</div>
							<dt className="mt-4 font-onest font-semibold text-white text-2xl">
								Weekly articles
							</dt>
							<dd className="mt-2 leading-7 font-noto font-thin text-sm text-white text-justify">
								Discover our best options for homes to rent, whether for a
								perfect vacation or an ideal place to call home. Browse our
								selection of weekly articles and find your next haven!
							</dd>
						</div>
						<div className="flex flex-col items-start">
							<div className="rounded-full bg-white/5 p-2 ring-1 ring-white/10">
								<HeartIcon className="h-6 w-6 text-white" aria-hidden="true" />
							</div>
							<div className="mt-4 font-onest font-semibold text-white text-2xl">
								Lets keep in touch
							</div>
							<div className="flex gap-x-11 mt-3 text-violet text-4xl">
								<a href="https://www.instagram.com">
									<InstagramOutlined />
								</a>
								<div>
									<a href="https://github.com/joaBotto/proyectofinal">
										<GithubOutlined />
									</a>
								</div>
								<div>
									<a href="https://whatsapp.com" target="_blank">
										<WhatsAppOutlined />
									</a>
								</div>
							</div>
						</div>
					</dl>
				</div>
			</div>
		</div>
	);
}
