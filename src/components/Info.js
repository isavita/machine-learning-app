import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const Info = () => (
  <ListGroup>
    <ListGroupItem href='https://js.tensorflow.org/' target='_blank'>TensorFlowJS</ListGroupItem>
    <ListGroupItem href='https://medium.com/all-of-us-are-belong-to-machines/the-gentlest-introduction-to-tensorflow-248dc871a224' target='_blank'>Introduction to Tensorflow 1</ListGroupItem>
    <ListGroupItem href='https://medium.com/all-of-us-are-belong-to-machines/gentlest-introduction-to-tensorflow-part-2-ed2a0a7a624f' target='_blank'>Introduction to Tensorflow 2</ListGroupItem>
    <ListGroupItem href='https://medium.com/all-of-us-are-belong-to-machines/gentlest-intro-to-tensorflow-part-3-matrices-multi-feature-linear-regression-30a81ebaaa6c' target='_blank'>Introduction to Tensorflow 3</ListGroupItem>
    <ListGroupItem href='https://medium.com/all-of-us-are-belong-to-machines/gentlest-intro-to-tensorflow-4-logistic-regression-2afd0cabc54' target='_blank'>Introduction to Tensorflow 4</ListGroupItem>
  </ListGroup>
);

export default Info;
