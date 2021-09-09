import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Platform,
	TouchableWithoutFeedback,
	View,
	Text,
	TextInput,
	FlatList,
	Keyboard,
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface ISkillData {
	id: string;
	name: string;
}

export const Home = () => {
	const [greeting, setGreeting] = useState('');
	const [newSkill, setNewSkill] = useState('');
	const [mySkills, setMySkills] = useState<ISkillData[]>([]);
	const [mySkillsReverse, setMySkillsReverse] = useState<ISkillData[]>([]);
	const [errorMessage, setErrorMessage] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			const currentHour = new Date().getHours();
			if (currentHour >= 5 && currentHour < 12) {
				setGreeting('Good morning!');
			} else if (currentHour >= 5 && currentHour < 18) {
				setGreeting('Good afternoon!');
			} else if (currentHour >= 18 && currentHour < 21) {
				setGreeting('Good evening!');
			} else {
				setGreeting('Good night!');
			}
		}, 60000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		setMySkillsReverse(mySkills.reverse());
	}, [mySkills]);

	const handleAddNewSkill = () => {
		if (newSkill.trim() === '') {
			setErrorMessage(true);
			setTimeout(() => {
				setErrorMessage(false);
			}, 5000);
		} else {
			setErrorMessage(false);
			const data = {
				id: String(new Date().getTime()),
				name: newSkill.trim(),
			};
			setMySkills([...mySkills, data]);
			setNewSkill('');
			Keyboard.dismiss();
		}
	};

	const handleDeleteSkill = (id: string) => {
		setMySkills(mySkills.filter(skill => skill.id !== id));
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<Text style={styles.title}>iRegister</Text>
				<Text style={styles.greetings}>{greeting}</Text>
				<TextInput
					style={styles.input}
					placeholder='New Skill'
					placeholderTextColor='#555'
					autoCapitalize='words'
					onSubmitEditing={handleAddNewSkill}
					blurOnSubmit={true}
					value={newSkill}
					onChangeText={value => {
						setNewSkill(value);
						setErrorMessage(false);
					}}
				/>
				<Button title='Add' onPress={handleAddNewSkill} />
				{errorMessage && (
					<Text style={styles.errorMessage}>Não pode ser vazio!</Text>
				)}
				<Text style={[styles.title, { marginTop: 30, fontSize: 20 }]}>
					My Skills
				</Text>
				<FlatList
					data={mySkillsReverse}
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<SkillCard
							skill={item.name}
							onPress={() => handleDeleteSkill(item.id)}
						/>
					)}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#212121',
		paddingHorizontal: 20,
		paddingVertical: 60,
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
	input: {
		backgroundColor: '#2d2d30',
		color: '#fff',
		fontSize: 18,
		padding: Platform.OS === 'ios' ? 15 : 12,
		marginTop: 30,
		borderRadius: 10,
		height: 50,
	},
	errorMessage: {
		marginTop: 20,
		color: '#fa0707',
		fontSize: 15,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
