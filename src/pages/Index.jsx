import { Container, Text, VStack, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useFoo } from "../integrations/supabase/index.js";

const Index = () => {
  const { data, error, isLoading } = useFoo();

  if (isLoading) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Your Blank Canvas</Text>
        <Text>Chat with the agent to start making edits.</Text>
        {data && data.map((foo) => (
          <Text key={foo.id}>{foo.title}</Text>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;