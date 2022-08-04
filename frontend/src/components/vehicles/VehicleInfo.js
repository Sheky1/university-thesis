import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";

export default function VehiclePreview(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === props.vehicle.images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? props.vehicle.images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = props.vehicle.images.map((image) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={image.url}
      >
        <img
          src={require(`../../images/uploaded/${image.url}`)}
          alt={"Vozilo"}
        />
      </CarouselItem>
    );
  });
  console.log(props);

  return (
    <>
      <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row style={{ width: "100%", margin: 0 }}>
          <article className="vehicle-preview">
            <div className="title">
              <h2>{props.vehicle.name}</h2>
              <h5>
                {props.vehicle.transmission_type} |{" "}
                {props.vehicle.vehicleSize.name}
              </h5>
            </div>
            <div className="vehicle-preview-container">
              <Col lg="6" xs="12" className="pl-0">
                <div className="vehicle-preview-left">
                  <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                  >
                    <CarouselIndicators
                      items={props.vehicle.images}
                      activeIndex={activeIndex}
                      onClickHandler={goToIndex}
                    />
                    {slides}
                    <CarouselControl
                      direction="prev"
                      directionText="Previous"
                      onClickHandler={previous}
                    />
                    <CarouselControl
                      direction="next"
                      directionText="Next"
                      onClickHandler={next}
                    />
                  </Carousel>
                  {/* {require(`../../images/uploaded/${this.props.vehicle.images[0].url}`) && (
                    <img
                      src={require(`../../images/uploaded/${this.props.vehicle.images[0].url}`)}
                      alt=""
                    />
                  )} */}
                </div>
              </Col>
              <Col lg="6" xs="12" className="pr-0">
                <div className="vehicle-preview-right">
                  <div className="vehicle-preview-card">
                    <div className="vehicle-preview-text">
                      <span className="vehicle-preview-text-left">menjac</span>
                      <span className="vehicle-preview-text-right">
                        {props.vehicle.transmissionType}
                      </span>
                    </div>
                    <div className="vehicle-preview-text">
                      <span className="vehicle-preview-text-left">
                        kapacitet putnika
                      </span>
                      <span className="vehicle-preview-text-right">
                        {props.vehicle.passengerCount}
                      </span>
                    </div>
                    <div className="vehicle-preview-text">
                      <span className="vehicle-preview-text-left">
                        broj vrata
                      </span>
                      <span className="vehicle-preview-text-right">
                        {props.vehicle.doorCount}
                      </span>
                    </div>
                    <div className="vehicle-preview-text">
                      <span className="vehicle-preview-text-left">godiste</span>
                      <span className="vehicle-preview-text-right">
                        {props.vehicle.year}
                      </span>
                    </div>
                  </div>
                  <div className="vehicle-preview-card">
                    <div className="vehicle-preview-text">
                      <span className="vehicle-preview-text-left">
                        cena dnevno
                      </span>
                      <span className="vehicle-preview-text-right">
                        {props.vehicle.price} {props.vehicle.currency.name}
                      </span>
                    </div>
                    <div className="vehicle-preview-text">
                      <span className="vehicle-preview-text-left">
                        registarski broj
                      </span>
                      <span className="vehicle-preview-text-right">
                        {props.vehicle.registerNumber}
                      </span>
                    </div>
                    <div className="vehicle-preview-text">
                      <span className="vehicle-preview-text-left">
                        kubikaza
                      </span>
                      <span className="vehicle-preview-text-right">
                        {props.vehicle.cubicSize}
                      </span>
                    </div>
                    <div className="vehicle-preview-text">
                      <span className="vehicle-preview-text-left">
                        velicina
                      </span>
                      <span className="vehicle-preview-text-right">
                        {props.vehicle.vehicleSize.name}
                      </span>
                    </div>
                    <div className="vehicle-preview-text">
                      <span className="vehicle-preview-text-left">
                        tip goriva
                      </span>
                      <span className="vehicle-preview-text-right">
                        {props.vehicle.fuelType.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            </div>

            <div className="vehicle-preview-additions">
              <span className="vehicle-preview-additions-text">
                ukljuceni dodaci:{" "}
                {props.vehicle.additions.map((addition, index) => {
                  if (index === props.vehicle.additions.length - 1)
                    return `${addition.name}`;
                  return `${addition.name}, `;
                })}
              </span>
            </div>
          </article>
        </Row>
      </Container>
    </>
  );
}
