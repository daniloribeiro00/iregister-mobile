import React from 'react';
import {
	StyleSheet,
	Platform,
	TouchableOpacity,
	TouchableOpacityProps,
	Text,
} from 'react-native';

interface ISkillCardProps extends TouchableOpacityProps {
	skill: string;
}

export const SkillCard = ({ skill, ...props }: ISkillCardProps) => {
	return (
		<TouchableOpacity style={styles.buttonSkill} activeOpacity={0.7} {...props}>
			<Text style={styles.textSkill}>{skill}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	buttonSkill: {
		backgroundColor: '#2d2d30',
		padding: Platform.OS === 'ios' ? 15 : 12,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 15,
		height: 60,
	},
	textSkill: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
	},
});
