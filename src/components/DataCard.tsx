import React from 'react';
import {
	StyleSheet,
	Platform,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
	Text,
} from 'react-native';

interface IDataCardProps extends TouchableOpacityProps {
	name: string;
	email: string;
	phone: string;
}

export const DataCard = ({ name, email, phone, ...props }: IDataCardProps) => {
	return (
		<TouchableOpacity style={styles.button} activeOpacity={0.7} {...props}>
			<Text style={styles.textName}>{name}</Text>
			<View style={styles.vertical}>
				<Text style={styles.textEmail}>{email}</Text>
				<Text style={styles.textPhone}>{phone}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#2d2d30',
		padding: Platform.OS === 'ios' ? 15 : 12,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 15,
		minHeight: 60,
	},
	vertical: {
		flex: 4,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	textName: {
		flex: 3,
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
	},
	textEmail: {
		width: '100%',
		color: '#fff',
		fontSize: 14,
		textAlign: 'right',
	},
	textPhone: {
		width: '100%',
		color: '#fff',
		fontSize: 11,
		textAlign: 'right',
	},
});
