import React, { useContext, useState } from "react";
import { SfwTags, NsfwTags } from "./Tags";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Styles from "./Styles.module.scss";
import queryStore from "../../Stores/QueryStore/query.store";
import { Store } from "../../Stores/store";

const nsfwSuggestions = NsfwTags.map((tag) => {
  return {
    id: tag.id,
    text: tag.text,
  };
});

const sfwSuggestions = SfwTags.map((tag) => {
  return {
    id: tag.id,
    text: tag.text,
  };
});

const TagModal = ({ handleClose, handleShow, show }: { show: boolean; handleClose: () => void; handleShow: () => void }) => {
  const { queryStore } = useContext(Store);
  const { isGIF, addTag, isSFW, setIsSFW, setIsGIF, tags } = queryStore;
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tag selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              {isSFW
                ? sfwSuggestions.map((suggestion) => {
                    return (
                      <Col xs={12} sm={6} key={suggestion.id}>
                        <div
                          className={`${Styles.tags} ${tags.includes(suggestion.id) ? Styles.enabled : ""}`}
                          onClick={() => {
                            addTag(suggestion.text);
                          }}
                        >
                          <h2 className={Styles.tagText}>{suggestion.text}</h2>
                        </div>
                      </Col>
                    );
                  })
                : nsfwSuggestions.map((suggestion) => {
                    return (
                      <Col xs={12} sm={6} key={suggestion.id}>
                        <div
                          className={`${Styles.tags} ${tags.includes(suggestion.id) ? Styles.enabled : false}`}
                          onClick={() => {
                            console.log(tags);
                            console.log(tags.includes(suggestion.id));
                            addTag(suggestion.text);
                          }}
                        >
                          <h2 className={Styles.tagText}>{suggestion.text}</h2>
                        </div>
                      </Col>
                    );
                  })}
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            <p className="text-white p-0 m-0 ">Save selection</p>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TagModal;
