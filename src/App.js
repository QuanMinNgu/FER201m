import { useRef, useState } from "react";
import "./App.css";
import data from "./data.json";
import UserRow from "./components/UserRow";
function App() {
	const [students, setStudents] = useState(data);

	const [searchStudent, setSearchStudent] = useState([]);
	const [searchBo, setSearchBo] = useState(false);

	const nameRef = useRef();
	const genderRef = useRef();
	const ageRef = useRef();
	const searchRef = useRef();

	function generateRandomString(length) {
		let result = "";
		const characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		const charactersLength = characters.length;

		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		return result;
	}

	const handleCreateStudent = () => {
		const user = {
			id: generateRandomString(10),
			name: nameRef.current.value,
			gender: genderRef.current.value,
			age: ageRef.current.value,
		};

		if (!user.name || !user.age || !user.gender) {
			return window.alert("Please enter all fields");
		}
		const some = students.some(
			(item) => item?.id?.toString() == user?.id?.toString()
		);
		if (some) {
			handleCreateStudent();
		} else {
			setStudents([...students, { ...user }]);
			nameRef.current.value = "";
			ageRef.current.value = "";
		}
	};

	const handleSearching = () => {
		if (!searchRef.current?.value) {
			setSearchStudent([]);
			setSearchBo(false);
		} else {
			const search = searchRef.current?.value;
			const newArr = students?.filter(
				(item) => item?.name?.toLowerCase()?.includes(search?.toLowerCase())
				//item?.name?.toLowerCase() == search?.toLowerCase()
			);
			setSearchStudent([...newArr]);
			setSearchBo(true);
		}
	};
	return (
		<div className="App">
			<div className="app_container">
				<div className="title">List of Students</div>
				<div className="search">
					<input
						ref={searchRef}
						type="text"
						placeholder="Enter name to search"
					/>
					<button onClick={handleSearching}>Search</button>
				</div>
				<div>
					<table>
						<thead>
							<tr>
								<th className="name">Name</th>
								<th className="gender">Gender</th>
								<th className="age">Age</th>
								<th className="action">Actions</th>
							</tr>
						</thead>
						{searchBo ? (
							<tbody>
								{searchStudent?.map((item, index) => (
									<UserRow
										students={students}
										setStudents={setStudents}
										key={index}
										item={item}
									/>
								))}
							</tbody>
						) : (
							<tbody>
								{students?.map((item, index) => (
									<UserRow
										students={students}
										setStudents={setStudents}
										key={index}
										item={item}
									/>
								))}
							</tbody>
						)}
					</table>
				</div>
				<div className="add">
					<div>Add a new student</div>
					<div className="add_form">
						<input ref={nameRef} type="text" placeholder="Enter a name" />
						<input ref={ageRef} type="text" placeholder="Enter a age" />
						<select
							style={{
								marginRight: "0.5rem",
								height: "3rem",
								padding: "0 1rem",
							}}
							ref={genderRef}
						>
							<option value="male">Male</option>
							<option value="female">female</option>
						</select>
						<button onClick={handleCreateStudent}>add</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
