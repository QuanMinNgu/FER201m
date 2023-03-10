import React, { useRef, useState } from "react";

const UserRow = ({ item, setStudents, students }) => {
	const nameRef = useRef();
	const ageRef = useRef();
	const genderRef = useRef();
	const [change, setChange] = useState(false);

	const handleCreateEditStudent = () => {
		const user = {
			id: item?.id,
			name: nameRef.current?.value,
			gender: genderRef.current?.value,
			age: ageRef.current?.value,
		};

		if (!user.name || !user.age || !user.gender) {
			return window.alert("Please enter all fields");
		}

		const newArr = students.map((infor) => {
			if (infor?.id?.toString() == item?.id?.toString()) {
				return {
					...user,
				};
			}
			return infor;
		});
		setStudents([...newArr]);
		setChange(false);
	};

	const handleDeleteItem = () => {
		const check = window.confirm("Bạn có muốn xóa thằng này ko?");
		if (!check) {
			return;
		}
		const some = students.some(
			(infor) => infor?.id?.toString() == item?.id?.toString()
		);
		if (some) {
			const newArr = students.filter((infor) => {
				return infor?.id?.toString() != item?.id?.toString();
			});
			setStudents([...newArr]);
		}
	};
	return (
		<tr className="user_infor">
			<th className="name">
				{!change ? (
					item?.name
				) : (
					<input ref={nameRef} defaultValue={item?.name} />
				)}
			</th>
			<th className="gender">
				{!change ? (
					item?.gender
				) : (
					<select ref={genderRef}>
						{item?.gender === "male" ? (
							<option>male</option>
						) : (
							<option selected>male</option>
						)}
						{item?.gender === "male" ? (
							<option>female</option>
						) : (
							<option selected>femlale</option>
						)}
					</select>
				)}
			</th>
			<th className="age">
				{!change ? (
					item?.age
				) : (
					<input
						ref={ageRef}
						style={{
							width: "5rem",
						}}
						defaultValue={item?.age}
					/>
				)}
			</th>
			{!change ? (
				<th className="button">
					<button
						onClick={() => {
							setChange(true);
						}}
					>
						Edit
					</button>
					<button
						style={{
							backgroundColor: "red",
							color: "white",
						}}
						onClick={handleDeleteItem}
					>
						Delete
					</button>
				</th>
			) : (
				<th className="button">
					<button onClick={handleCreateEditStudent}>Save</button>
					<button
						onClick={() => {
							setChange(false);
						}}
					>
						Cancle
					</button>
				</th>
			)}
		</tr>
	);
};

export default UserRow;
