import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';


export default function App() {
  const [display, setDisplay] = useState('')
  const [result, setResult] = useState('')
  const col1Buttons = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    [',', '0', '=']
  ]

  const col2Buttons =['C', '÷', 'x',  '-', '+']


  const handleOp = op =>{
    if(op === 'C'){
      setDisplay('')
      setResult('')
    }else if(op === '='){ 
      setDisplay(result)
      setResult('')
    }else{

      const display2 = display + op
      let result2 = result 
      try{
        let fixedOperation = display2.split('x').join('*')
        fixedOperation = fixedOperation.split('÷').join('/')
        fixedOperation = fixedOperation.split(',').join('.')
        result2 = eval(fixedOperation).toString()
        result2 = result2.split('.').join(',')
      }catch(e){}

      setDisplay(display2)
      setResult(result2)
    }
  }

  const renderColumn = (line, index) =>{
    return(
      <View key={index} style={styles.line}>
          {line.map((numero) =>{
            return(
              <TouchableOpacity onPress={() => handleOp(numero)} key={numero} style={styles.btn}>
                  <Text  style={styles.btnText}>{numero}</Text>
              </TouchableOpacity>
            )
          })}
  </View>
    )
  }
  return (
    <View style={styles.container}>
       <Text style={styles.display}>{display}</Text>
       <Text style={styles.result}>{result}</Text>
       <View style={styles.buttons}>
           <View style={styles.col1}>
              
            {col1Buttons.map(renderColumn)}
              
           </View>
           <View style={styles.col2}>
             {col2Buttons.map((op, index)=>{
              return(
                <TouchableOpacity onPress={() => handleOp(op)} key={index} style={styles.btn}>
                    <Text style={styles.btnText}>{op}</Text>
                </TouchableOpacity>
              )
             })}
         
           
           </View>
           
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  display : {
    flex  : 1,
    backgroundColor : '#EFEFEF',
    fontSize : 80,
    textAlign : 'right',
    paddingTop : 30,
    paddingRight : 10
  },
  result :{
    flex : 0.4,
    backgroundColor : '#EFEFEF',
    fontSize : 40,
    textAlign : 'right',
    paddingRight : 10,
    paddingBottom : 10
  },
  buttons : {
    flex : 5,
    flexDirection : 'row',
    
  }, 
  col1 : {
    flex : 3,
    backgroundColor : '#2d2d2d',
    flexDirection : 'column',


  },
  col2 : {
    flex : 1,
    backgroundColor : '#0b0b0b',
    flexDirection : 'column'
  },
  line :{
    flex : 1,
    flexDirection : 'row',
    
  },
  btn : {
    flex : 1  ,
    justifyContent : 'center',

  },
  btnText : {
    textAlign : 'center',
    fontSize : 50 ,
    color : 'white'
  }
});
