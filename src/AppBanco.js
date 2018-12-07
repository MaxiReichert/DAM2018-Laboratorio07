import React, {Component} from 'react';
import {ToastAndroid, Button, StyleSheet, Text, TextInput, Picker, View, Switch, CheckBox, Slider} from 'react-native';

export default class AppBanco extends Component{
	constructor(props){
		super(props);
		this.state={
			moneda:1,
			capitalInicial:0,
			capitalFinal:0,
			dias:10,
			correo:'',
			cuit:'00-00000000-0',
			avisarMail:false,
			acepto:false,
			resultado:'Plazo Fijo{ Dias= 10, Monto= 0\nAvisar por mail= false, Moneda= 1 }'
		};
		this.hacerPlazoFijo = this.hacerPlazoFijo.bind(this);
	}
	
	hacerPlazoFijo(){
		if(this.state.correo=='') ToastAndroid.show('Ingrese su Correo Electronico', ToastAndroid.LONG);
		else if(this.state.cuit=='00-00000000-0' || this.state.cuit=='') ToastAndroid.show('Ingrese su Cuit', ToastAndroid.LONG);
		else if(this.state.capitalInicial==0 || isNaN(this.state.capitalInicial)) ToastAndroid.show('Ingrese un monto', ToastAndroid.LONG);
		else if(this.state.acepto==false) ToastAndroid.show('Debe aceptar las condiciones', ToastAndroid.LONG);
		else {
			this.state.capitalFinal= this.state.capitalInicial+calcularInteres(this.state.capitalInicial, this.state.dias);
			ToastAndroid.show('Plazo Fijo realizado con exito', ToastAndroid.LONG);
		}
	}
	
	
	
	changeTextValue = () => {
    this.setState({resultado: "Plazo Fijo{ Dias= "+this.state.dias+", Monto= "+this.state.capitalFinal+"\n"
	+"Avisar por mail= "+this.state.avisarMail+", Moneda= "+this.state.moneda+" }"});
  }
	
	render(){
		return(
			<View style={styles.container}>
				<Text style={styles.welcome}>Banco Online</Text>
				<Text style={styles.instructions}>Correo Electronico</Text>
				<TextInput
					onChangeText={(correo) => this.setState({correo})}>
					correo@mail.com
					</TextInput>
				<Text style={styles.instructions}>CUIT</Text>
				<TextInput
					onChangeText={(cuit) => this.setState({cuit})}>
					00-00000000-0
				</TextInput>
				<Text style={styles.instructions}>Moneda</Text>
				<Picker
					style={{width:200}}
					selectedValue={this.state.moneda}
					onValueChange={(valor) => this.setState({moneda:valor})}>
					<Picker.Item label="Dolar" value="1" />
					<Picker.Item label="Pesos ARS" value="2" />
				</Picker>
				<Text style={styles.instructions}>Monto</Text>
				<TextInput
					onChangeText={(monto) => this.setState({capitalInicial: parseInt(monto)})}>
					000
				</TextInput>
				<Text style={styles.instructions}>Dias</Text>
				<Slider
					step={1}
					maximumValue={365}
					minimumValue={1}
					value={this.state.dias}
					onValueChange={(diasElegidos) => this.setState({dias: parseInt(diasElegidos)})}></Slider>
				<Text style={styles.instructions}>{this.state.dias + " dias"}</Text>
				<View style={styles.checkContainer}>
					<Text style={styles.textCheck}>Avisar por mail</Text>
					<Switch
						value={this.state.avisarMail}
						onValueChange={(mail) => this.setState({avisarMail: mail})}></Switch>
				</View>
				<View style={styles.checkContainer}>
					<CheckBox title='Acepto condiciones'
						value={this.state.acepto}
						onValueChange={(acepto) => this.setState({acepto})}/>
					<Text style={styles.textCheck}>Acepto condiciones</Text>
				</View>
				<Button title="Hacer Plazo Fijo"
					color="#FF0000"
					onPress={this.hacerPlazoFijo}>
				</Button>
				<Text style={styles.resultadoStyle}
				onPress={this.changeTextValue}>
					{this.state.resultado}
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: { 
		textAlign: 'center', 
		color: '#333333', 
		marginBottom: 5, 
	},
	resultadoStyle: {
		fontSize: 15,
		color: 'blue',
		marginBottom: 5,
	},
	checkContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		backgroundColor: '#F5FCFF',
	},
	textCheck:{
		textAlign:'center',
		color: '#333333',
		marginTop:5,
	},
	
});

function calcularInteres(capital, dias){
		tasa= 0.25;
		if(dias >= 30 && capital<=5000 && capital>0) tasa=0.275;
		else if(dias < 30 && capital>5000 && capital<=99999) tasa=0.3;
		else if(dias >=30 && capital>5000 && capital<=99999) tasa=0.323;
		else if(dias <30 && capital>99999) tasa=0.35;
		else tasa=0.385;
		interes= capital*(Math.pow((1+(tasa/100)), (dias/360))-1);
		return interes;
}