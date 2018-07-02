
import React, { Component } from 'react';
import { Carousel, CarouselCaption, CarouselControl, CarouselInner, CarouselItem, CarouselIndicators, CarouselIndicator, View, Mask, Container } from 'mdbreact';
import MenuServices from './MenuServices';

class CarouselInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.state = {
      activeItem: 1,
      maxLength: 14
    };
  }

  next() {
    let nextItem = this.state.activeItem + 1;
    if(nextItem > this.state.maxLength) {
      this.setState({ activeItem: 1 });
    } else {
      this.setState({ activeItem: nextItem });
    }
  }

  prev() {
    let prevItem = this.state.activeItem - 1;
    if(prevItem < 1) {
      this.setState({ activeItem: this.state.maxLength });
    } else {
      this.setState({ activeItem: prevItem });
    }
  }

  goToIndex(item) {
    if (this.state.activeItem !== item) {
      this.setState({
        activeItem: item
      });
    }
  }

  render(){
    const { activeItem } = this.state;
    return(
      <div>
        {/* <MenuServices/> */}
        <Carousel 
          activeItem={this.state.activeItem}
          next={this.next}
          className="z-depth-1 natural-spa__services-banner">
          <CarouselInner>
            <CarouselItem itemId="1">
              <View>
                <img className="d-block w-100" src="../../assets/img/info1.png" />
                <Mask overlay="black-light"></Mask>
              </View>
            </CarouselItem>
            <CarouselItem itemId="2">
              <View>
                <img className="d-block w-100" src="../../assets/img/info2.png" alt="First slide" />
                <Mask overlay="black-light"></Mask>
              </View>
            </CarouselItem>
            <CarouselItem itemId="3">
              <View>
                <img className="d-block w-100" src="../../assets/img/info3.png" alt="First slide" />
                <Mask overlay="black-light"></Mask>
              </View>
            </CarouselItem>
            <CarouselItem itemId="4">
              <View>
                <img className="d-block w-100" src="../../assets/img/info4.png" alt="First slide" />
                <Mask overlay="black-light"></Mask>
              </View>
            </CarouselItem>
            <CarouselItem itemId="5">
              <View>
                <img className="d-block w-100" src="../../assets/img/info5.png" alt="First slide" />
                <Mask overlay="black-light"></Mask>
              </View>
            </CarouselItem>
            <CarouselItem itemId="6">
              <View>
                <img className="d-block w-100" src="../../assets/img/info6.png" alt="First slide" />
                <Mask overlay="black-light"></Mask>
              </View>
            </CarouselItem>
            <CarouselItem itemId="7">
              <View>
                <img className="d-block w-100" src="../../assets/img/info7.png" alt="First slide" />
                <Mask overlay="black-light"></Mask>
              </View>
            </CarouselItem>
            <CarouselItem itemId="8">
              <View>
                <img className="d-block w-100" src="../../assets/img/info8.png" alt="First slide" />
                <Mask overlay="black-light"></Mask>
              </View>
            </CarouselItem>
            <CarouselItem itemId="9">
              <View>
                <img className="d-block w-100" src="../../assets/img/info9.png" alt="First slide" />
                <Mask overlay="black-light"></Mask>
              </View>
            </CarouselItem>
            <CarouselItem itemId="10">
              <View>
                <img className="d-block w-100" src="../../assets/img/info10.png" alt="First slide" />
                <Mask overlay="black-light"></Mask>
              </View>
            </CarouselItem>
            <CarouselItem itemId="11">
              <View>
                <img className="d-block w-100" src="../../assets/img/info11.png" alt="First slide" />
                <Mask overlay="black-light"></Mask>
              </View>
            </CarouselItem>
            <CarouselItem itemId="12">
              <View>
                <img className="d-block w-100" src="../../assets/img/info12.png" alt="First slide" />
                <Mask overlay="black-light"></Mask>
              </View>
            </CarouselItem>
            <CarouselItem itemId="13">
              <View>
                <img className="d-block w-100" src="../../assets/img/info13.png" alt="First slide" />
                <Mask overlay="black-light"></Mask>
              </View>
            </CarouselItem>
            <CarouselItem itemId="14">
              <View>
                <img className="d-block w-100" src="../../assets/img/info14.png" alt="First slide" />
                <Mask overlay="black-light"></Mask>
              </View>
            </CarouselItem>
          </CarouselInner>
          <CarouselControl direction="prev" role="button" onClick={() => { this.prev(); }}>PREV</CarouselControl>
          <CarouselControl direction="next" role="button" onClick={() => { this.next(); }}>NEXT</CarouselControl>
          <CarouselIndicators>
         </CarouselIndicators>
        </Carousel>
      </div>
    );
  }
}

export default CarouselInfoComponent;
                