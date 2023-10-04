import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.jpg";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "rtk/slices/authSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { loginSuccess } from "rtk/slices/authSlice";

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const handleClick = () => setShow(!show);
  const handleClick2 = () => setShow2(!show2);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [remeber, setRemember] = useState(false);
  const { user, error, msg } = useSelector((state) => state.auth);
  const [loading, setLoading] = React.useState(false);
  const params = useParams("").name;
  const [name, setName] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  useEffect(() => {
    // redirect user to login page if registration was successful
    if (error) navigate("/" + params + "/login");
    // redirect authenticated user to profile screen
    if (user && user.user.tenant_id == params)
      navigate("/" + params + "/default");
  }, [navigate, user, error]);

  const handleSubmit = async () => {
    console.log(params);
    setLoading(true);

    // e.preventDefualt();
    let user = {
      email,
      password,
      name,
      password_confirmation,
    };
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `https://${params}.almnew.online/api/register`,
        user,
        config
      );
      console.log(res);
      if (res.status === 200) {
        dispatch(loginSuccess(res.data));
      }
      setLoading(false);
    } catch (error) {
      // return custom error message from backend if present
      console.log(error);
      setLoading(false);
    }

    // dispatch(registerUser(user));
    // await dispatch(loginUser({ user, setLoading, params }));
  };
  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "20px", md: "6vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign Up
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            {/* Enter your email and password to sign in! */}
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="p-3 rounded-4 mb-2"
          >
            <FormControl>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Name<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                placeholder="mail@simmmple.com"
                mb="24px"
                fontWeight="500"
                size="lg"
                onChange={(e) => setName(e.target.value)}
              />
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="email"
                placeholder="mail@simmmple.com"
                mb="24px"
                fontWeight="500"
                size="lg"
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Min. 8 characters"
                  mb="24px"
                  size="lg"
                  type={show ? "text" : "password"}
                  variant="auth"
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Confirmation Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  onChange={(e) => setPassword_confirmation(e.target.value)}
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Min. 8 characters"
                  mb="24px"
                  size="lg"
                  type={show2 ? "text" : "password"}
                  variant="auth"
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show2 ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick2}
                  />
                </InputRightElement>
              </InputGroup>

              {loading ? (
                <></>
              ) : (
                <Button
                  type="submit"
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="100%"
                  h="50"
                  mb="24px"
                >
                  Sign Up
                </Button>
              )}
            </FormControl>
          </form>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              i am have account?
              <NavLink to={"/" + params + "/login"}>
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Login
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
