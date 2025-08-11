import { useAppContext } from "@/components/context/AppContextProvider";
import Form from "@/components/Form";
import GroupMembersList from "@/components/GroupMembersList";
import Input from "@/components/Input";
import {
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import useToast from "@/hooks/useToast";
import { createGroup, deleteGroup, editGroup } from "@/supabase/groups";
import { groupT, withoutIdT } from "@/types";
import { hookFormErrorHandler, unknownErrorHandler } from "@/utils";
import { groupsSchema } from "@/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "expo-router";
import { ArrowRight, X } from "lucide-react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";

const Members = () => {
  const [createFamily, setCreateFamily] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<groupT>();
  const [groupToEdit, setGroupToEdit] = useState<groupT>();

  function toggleCreateFamily() {
    setCreateFamily((prev) => !prev);
  }
  const {
    userMethods: { myGroups, user },
  } = useAppContext();
  const toast = useToast();
  const createFamilyForm = useForm({
    resolver: zodResolver(groupsSchema.omit({ id: true })),
    defaultValues: {
      admin_id: user?.id,
    },
  });
  const editFamilyForm = useForm({
    resolver: zodResolver(groupsSchema),
  });

  async function sumbitCreateFamily(data: withoutIdT<groupT>) {
    try {
      if (!user) {
        throw new Error("User is required");
      }
      Keyboard.isVisible() && Keyboard.dismiss();
      const res = await createGroup(data);
      if (!res.error) {
        toast.show({ message: "Family successly created" });
      } else {
        throw new Error(res.error.message);
      }
      toggleCreateFamily();
    } catch (error) {
      unknownErrorHandler(error);
      toast.show({
        message: "Sorry, we are unable to create an account now",
        status: "error",
      });
    }
  }

  const groupsKeys = !myGroups ? [] : Object.keys(myGroups);

  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "android" ? 80 : 0}
        className="flex-1"
      >
        <View className=" flex-1 bg-primary-900 p-4">
          {Boolean(groupsKeys.length) && myGroups && (
            <ScrollView>
              {groupsKeys.map((item) => {
                const members = myGroups[item];
                return (
                  <GroupMembersList
                    key={item}
                    members={members}
                    manage
                    deleteFunc={() => {
                      const group = members[0].group_id;
                      group && setGroupToDelete(group);
                    }}
                    editFunc={() => {
                      const group = members[0].group_id;
                      if (group) {
                        editFamilyForm.reset(group);
                        setGroupToEdit(group);
                      }
                    }}
                  />
                );
              })}
            </ScrollView>
          )}
          {!Boolean(groupsKeys.length) && (
            <Center className=" flex-1 gap-4 p">
              {createFamily ? (
                <Animated.View entering={SlideInDown} className={"w-full"}>
                  <Center>
                    <Button
                      onPress={toggleCreateFamily}
                      action="negative"
                      className=" rounded-full aspect-square"
                    >
                      <ButtonIcon as={X} />
                    </Button>
                  </Center>
                  <Form>
                    <Heading className=" text-center text-typography-100">
                      Create a family
                    </Heading>
                    <Input
                      label="Family name"
                      control={createFamilyForm.control}
                      name="name"
                      labelClassName="text-typography-50"
                      returnKeyLabel="Add"
                      returnKeyType="send"
                    />
                    <Button
                      disabled={createFamilyForm.formState.isSubmitting}
                      onPress={createFamilyForm.handleSubmit(
                        sumbitCreateFamily,
                        hookFormErrorHandler
                      )}
                    >
                      <ButtonText>Submit</ButtonText>
                      {!createFamilyForm.formState.isSubmitting ? (
                        <ButtonIcon as={ArrowRight} />
                      ) : (
                        <ButtonSpinner />
                      )}
                    </Button>
                  </Form>
                </Animated.View>
              ) : (
                <>
                  <Text>You are not a member of a family or organisation</Text>
                  <Button onPress={toggleCreateFamily}>
                    <ButtonText>Create a family</ButtonText>
                  </Button>
                </>
              )}
            </Center>
          )}
        </View>
      </KeyboardAvoidingView>
      <Modal
        isOpen={groupToDelete !== undefined}
        onClose={() => {
          setGroupToDelete(undefined);
        }}
      >
        <ModalBackdrop />
        <ModalContent className=" bg-error-100 bo">
          <ModalHeader>
            <Heading size="lg">Delete Group</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            {groupToDelete && (
              <Text className=" text-typography-900">
                {`You are about to delete ${groupToDelete.name}. Are you sure you want to proceed?`}
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              action="primary"
              className="mr-3"
              onPress={() => {
                setGroupToDelete(undefined);
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="negative"
              className="border-0"
              onPress={() => {
                groupToDelete &&
                  deleteGroup(groupToDelete).then((res) => {
                    if (!res.error) {
                      setGroupToDelete(undefined);
                    }
                  });
              }}
            >
              <ButtonText>Delete</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={groupToEdit !== undefined}
        onClose={() => {
          setGroupToEdit(undefined);
        }}
      >
        <ModalBackdrop />
        <ModalContent className=" bg-error-100 bo">
          <ModalHeader>
            <Heading size="lg">Edit Group</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            {groupToEdit && (
              <Text className=" text-typography-900">
                {`Edit ${groupToEdit.name}`}
              </Text>
            )}
            <Input
              control={editFamilyForm.control}
              name="name"
              type="text"
              label="Group name"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              action="primary"
              className="mr-3"
              onPress={() => {
                setGroupToEdit(undefined);
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              className="border-0"
              onPress={editFamilyForm.handleSubmit((data) => {
                editGroup(data).then((res) => {
                  if (!res.error) {
                    setGroupToEdit(undefined);
                  }
                });
              }, hookFormErrorHandler)}
            >
              <ButtonText>Edit</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack.Screen options={{ title: "Groups & Families" }} />
    </>
  );
};

export default Members;
