import React from "react";
import loading from "../../assets/img/loading.gif";

export default function Loading() {
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="absolute bg-black opacity-50 inset-0"></div>

			<div className="mt-2 mb-2 flex justify-center">
				<img src={loading} alt="error" className="w-40 h-40" />
			</div>
		</div>
	);
}
