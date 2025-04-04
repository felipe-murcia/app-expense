
import { StyleSheet, Text, TouchableOpacity, View, Image,Dimensions, Alert } from 'react-native';
import { colorPrimary } from '../../../constant/styles';

const iconSizeButton = 24;
 
interface Props{
    onPress?:() => void;
}

export const  ButtonCalendar = ({ onPress = () => {} }:Props) => {

    return (
        <TouchableOpacity onPress={()=>onPress()}>
            <View style={{flexDirection:'row', alignItems:'center', backgroundColor: colorPrimary, padding:10, borderRadius:50}} >
                <Image source={require('../../../assets/images/actions/calendar.png')} resizeMode="contain" style={{width:iconSizeButton, height:iconSizeButton, tintColor:'white' }} />
            </View>
        </TouchableOpacity>
    );
}

