import React, { useState, forwardRef, useImperativeHandle } from "react";
import { StyleSheet, Text, View} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default forwardRef((props, ref) => {
  // This handles state for the dropdown boxes, set default values
  const [selectedItem, setItem] = useState(0);
  const [selectedItemQty, setItemQtyValue] = useState(1);
  // These functions are called every time a value is changed
  function onItemChange(itemIndex) {
    setItem(itemIndex);
  }
  function onQtyChange(itemValue) {
    setItemQtyValue(itemValue);
  }
  // This is called when calculate total is pressed
  useImperativeHandle(ref, () => ({ updateTotal }));
  // Update the state based on the quantity and item price
  function updateTotal() {
    let item = parseInt(props.data[selectedItem].price);
    let qty = parseInt(selectedItemQty);    
    props.updateTotalCallback(item * qty);
  }

  return (
    <View style={styles.product}>
      <Text style={styles.productHeading}>{props.title}</Text>
      <View style={styles.productInput}>
        <Picker
          selectedValue={selectedItem}
          style={styles.pickerStyle}
          onValueChange={(itemValue, itemIndex) => onItemChange(itemValue)}
        >
          {props.data.map((item, index) => (
            <Picker.Item
              key={index}
              label={`${item.item}-$${item.price}`}
              value={index}
            />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedItemQty}
          style={styles.pickerStyle}
          onValueChange={(qtyValue, qtyIndex) => onQtyChange(qtyValue)}
        >
          {props.qtyArray.map((qty, index) => (
            <Picker.Item key={index} label={qty.toString()} value={qty} />
          ))}
        </Picker>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  product: {
    flex: 1,
    "justifyContent": "center",
    padding: 10,
  },
  productHeading: {
    // fontFamily: "cairo sansserif"
  },
  productInput: {
    flex: 1,
    "flexDirection": "row",
  },
  pickerStyle: {
    fontFamily: "inherit",
  },
});