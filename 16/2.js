import fs from 'fs';

function getData() {
  let arr = fs.readFileSync('16/input.txt', 'utf8')

  return arr;
}

/**
 * Transmission contains a single packet, which contains many other packets
 *  Might encode extra 0's at the end, these should be ignored
 * Every packet: 
 *  3 bits - version (number)
 *  3 bits - type ID (number)
 * 
 * Type 4 is "literal value", encodes a single binary number
 *    Padded with 0's until its length is a multiple of four bits, 
 *    then broken into groups of 4 bits. 
 *    Each group is prefixed by a 1 bit, except the last group (prefixed with a 0 bit)
 *  These groups (5 bits total) immediately follow the header (version + type)
 * 
 * Type ID: 
 * 4      : Literal Value      Encodes a single binary number
 *    - Padded at the front with 0's until its length is a multiple of 4 bits; 
 *    - Then broken into groups of 4 bits
 *    - Then each group is prefixed by a 1 bit, except the last group (prefixed with a 0 bit)
 *    - Each group (5 bits, prefix + data) immediately follow the header (version + type);
 * not 4  : Operator          Contains one or more packets
 * 
 * 
 * 
 * 
 * packet: 
 * {
 *    version: Number, 
 *    type: Number,
 *    value: Number,
 *    packets: []
 * }
 */


function convertToBinaryString(data) {
  return [...data].map(char => (('0000' + parseInt(char, 16).toString(2)).slice(-4))).join('');
}

function binToNum(bin) {
  return parseInt(bin, 2);
}

function decodeLiteralValue(bin) {
  let value = '';

  // Keep decoding the next 5 bits until it begins with 0
  while (bin.charAt(0) !== '0') {
    let group = bin.substring(0, 5);
    bin = bin.substring(5);

    value += group.substring(1);
  }

  // Get the last group (starting with a 0) too 
  let group = bin.substring(0, 5);
  bin = bin.substring(5);

  value += group.substring(1);

  // parse value
  return [bin, binToNum(value)];
}

function decodeOperator(bin, type) {
  const lengthTypeID = binToNum(bin.substring(0, 1));
  bin = bin.substring(1);

  let packets = [];

  switch (lengthTypeID) {
    case 0: // next 15 bits are the total length in bits of sub-packets
      const subPacketLength = binToNum(bin.substring(0, 15));
      bin = bin.substring(15);

      let containedBin = bin.substring(0, subPacketLength);
      bin = bin.substring(subPacketLength);

      while (containedBin.length > 0) {
        let newPacket;
        [containedBin, newPacket] = decodePackets(containedBin);
        packets.push(newPacket);
      };

      break;
    case 1: // next 11 bits are number of sub-packets contained
      const subPacketCount = binToNum(bin.substring(0, 11));
      bin = bin.substring(11);

      while (packets.length < subPacketCount) {
        let newPacket;
        [bin, newPacket] = decodePackets(bin);
        packets.push(newPacket);
      };

      break;
  }

  let value = 0;
  switch (type) {
    case 0: // Sum
      value = packets.reduce((a, b) => a + b.value, 0);
      break;
    case 1: // product (multiply together)
      value = packets.reduce((a, b) => a * b.value, 1);
      break;
    case 2: // minimum
      value = Math.min(...packets.map(a => a.value));
      break;
    case 3: // maximum
      value = Math.max(...packets.map(a => a.value));
      break;
    case 5: // greater than 
      value = packets[0].value > packets[1].value ? 1 : 0;
      break;
    case 6: // less than
      value = packets[0].value < packets[1].value ? 1 : 0;
      break;
    case 7: // equal to
      value = packets[0].value == packets[1].value ? 1 : 0;
      break;
  }

  return [bin, value, packets];
}

function decodePackets(bin) {
  let packet = {};

  packet.version = binToNum(bin.substring(0, 3));
  bin = bin.substring(3);

  packet.type = binToNum(bin.substring(0, 3));
  bin = bin.substring(3);

  switch (packet.type) {
    case 4: // literal value 
      [bin, packet.value] = decodeLiteralValue(bin);
      break;
    default:
      [bin, packet.value, packet.packets] = decodeOperator(bin, packet.type);
      break;
  }

  return [bin, packet];
}

export default function solve() {
  let data = getData();

  // To binary
  let bin = convertToBinaryString(data);

  let packet;
  [bin, packet] = decodePackets(bin);

  return packet.value;
};