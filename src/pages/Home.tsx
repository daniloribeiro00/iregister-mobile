import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	TouchableWithoutFeedback,
	View,
	Text,
	FlatList,
	Keyboard,
} from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { DataCard } from '../components/DataCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IData {
	id: string;
	name: string;
	email: string;
	phone: string;
}

export const Home = () => {
	let listViewRef: any;
	const [greeting, setGreeting] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [data, setData] = useState<IData[]>([]);
	const [errorMessage, setErrorMessage] = useState(false);

	const getGreeting = () => {
		const currentHour = new Date().getHours();
		if (currentHour >= 5 && currentHour < 12) {
			setGreeting('Bom dia');
		} else if (currentHour >= 5 && currentHour < 18) {
			setGreeting('Boa tarde!');
		} else {
			setGreeting('Boa noite!');
		}
	};

	useEffect(() => {
		getGreeting();
		const interval = setInterval(() => {
			getGreeting();
		}, 60000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const loadData = async () => {
			const storedData = await AsyncStorage.getItem('@iregister:data');
			if (storedData) {
				setData(JSON.parse(storedData));
			}
		};
		loadData();
	}, []);

	useEffect(() => {
		const saveData = async () => {
			await AsyncStorage.setItem('@iregister:data', JSON.stringify(data));
		};
		saveData();
	}, [data]);

	const handleSubmit = () => {
		if (name.trim() === '' || email.trim() === '' || phone.trim() === '') {
			setErrorMessage(true);
			setTimeout(() => {
				setErrorMessage(false);
			}, 5000);
		} else {
			setErrorMessage(false);
			const newData = {
				id: String(new Date().getTime()),
				name: name.trim(),
				email: email.trim(),
				phone: phone.trim(),
			};
			setData([...data, newData]);
			setName('');
			setEmail('');
			setPhone('');
			Keyboard.dismiss();
		}
	};

	const handleScroll = () => {
		listViewRef.scrollToEnd();
	};

	useEffect(() => {
		let timer1 = setTimeout(() => {
			handleScroll();
		}, 80);
		return () => clearTimeout(timer1);
	}, [data]);

	const handleDelete = (id: string) => {
		setData(data.filter(el => el.id !== id));
	};

	const handleDeleteAll = () => {
		setData([]);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<View style={styles.titleBox}>
					<Text style={styles.title}>iRegister</Text>
					<Text style={styles.greetings}>{greeting}</Text>
				</View>
				<View style={styles.form}>
					<Input
						error={errorMessage}
						placeholder='Nome'
						placeholderTextColor='#555'
						autoCapitalize='sentences'
						blurOnSubmit={true}
						value={name}
						onChangeText={value => {
							setName(value);
							setErrorMessage(false);
						}}
					/>
					<Input
						error={errorMessage}
						placeholder='Email'
						placeholderTextColor='#555'
						autoCapitalize='none'
						blurOnSubmit={true}
						value={email}
						onChangeText={value => {
							setEmail(value);
							setErrorMessage(false);
						}}
						keyboardType='email-address'
					/>
					<Input
						error={errorMessage}
						placeholder='Telefone'
						placeholderTextColor='#555'
						onSubmitEditing={handleSubmit}
						blurOnSubmit={true}
						value={phone}
						onChangeText={value => {
							setPhone(value);
							setErrorMessage(false);
						}}
						keyboardType='phone-pad'
					/>
					<Button title='Cadastrar' error={errorMessage} onPress={handleSubmit} />
				</View>

				<View style={{ flex: 1 }}>
					<View style={styles.dataBox}>
						<Text style={[styles.title, { fontSize: 20, marginBottom: 5 }]}>Dados Cadastrados</Text>
					</View>
					<View style={{ flex: 1 }}>
						<FlatList
							ref={ref => {
								listViewRef = ref;
							}}
							style={{
								height: 'auto',
								marginBottom: 80,
							}}
							data={data}
							keyExtractor={item => item.id}
							renderItem={({ item }) => (
								<DataCard
									name={item.name}
									email={item.email}
									phone={item.phone}
									onPress={() => handleDelete(item.id)}
								/>
							)}
							showsVerticalScrollIndicator={false}
						/>
					</View>
				</View>
				<Button bottom={true} title='Apagar todos' bgColor='#2d2d30' onPress={handleDeleteAll} />
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#212121',
		paddingTop: 60,
		paddingHorizontal: 20,
	},
	titleBox: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	title: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
	},
	greetings: {
		color: '#fff',
		marginTop: 5,
	},
	form: {
		borderStyle: 'solid',
		borderBottomWidth: 1,
		borderBottomColor: '#2d2d30',
		paddingBottom: 20,
	},
	dataBox: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 10,
		marginTop: 15,
	},
});
