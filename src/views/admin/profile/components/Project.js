// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
// Assets
import { MdEdit } from "react-icons/md";

export default function Project(props) {
  const { title, ranking, link, image, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "white");
  const bg = useColorModeValue("white", "navy.700");
  return (
    <Card bg={bg} {...rest} p="14px" className="col-12">
      <Flex
        align="center"
        direction={{ base: "column", md: "row" }}
        className="w-100"
      >
        <Box
          mt={{ base: "10px", md: "0" }}
          className="d-flex justify-content-between align-items-center w-100"
        >
          <Text
            color={textColorPrimary}
            fontWeight="500"
            fontSize="md"
            mb="4px"
            className="w-100 c-green"
          >
            {title}
          </Text>

          <Link
            href={link}
            className=" d-flex justify-content-end  gradient-button"
            style={{ lineHeight: "initial", with: "45%" }}
          >
            <div id="modal_trigger" href="#modal" className="active w-100">
              <i className="fa fa-sign-in-alt" /> Sign In Now
            </div>
          </Link>
          {/* <Text
            fontWeight="500"
            color={textColorSecondary}
            fontSize="sm"
            me="4px"
          >
            <Link fontWeight="500" color={brandColor} href={link} fontSize="sm">
              Go
            </Link>
          </Text> */}
        </Box>
      </Flex>
    </Card>
  );
}
