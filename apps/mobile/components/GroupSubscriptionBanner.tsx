import { primaryColors } from '@/constants';
import { router } from 'expo-router';
import { DollarSign, Info, Users } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Animated, { SlideInRight, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { groupT } from 'sgk-commanders-shared';
import { useDashboardContext } from './context/DashboardContextProvider';
import { Box } from './ui/box';
import { Button, ButtonIcon } from './ui/button';
import { Heading } from './ui/heading';
import { HStack } from './ui/hstack';
import { Icon } from './ui/icon';
import { Text } from './ui/text';
import { VStack } from './ui/vstack';

const GroupSubscriptionBanner = ({group}:{group:groupT}) => {
  const sharedBackgroundColor = useSharedValue<(typeof primaryColors)[keyof typeof primaryColors]>(primaryColors["--color-primary-600"])
  const { t } = useTranslation("group_members_list");
  const expired = group.subcriptionExpiration && new Date(group.subcriptionExpiration) < new Date();
  const noSubscription = !!group.subcriptionExpiration
  const {subscriptions} = useDashboardContext()
  useEffect(()=>{
      if (noSubscription || expired) {
        sharedBackgroundColor.value = withRepeat(withTiming(primaryColors["--color-primary-900"], {
          duration:1000
        } ), -1 , true)
      }
    },[expired, noSubscription])
    const subscription = subscriptions.find(
    (item) => item.id === group?.subcription
  );

  return (
    <HStack>
        <VStack className=" flex-1">
      
        <Box className="rounded-sm bg-typography-50 px-2 ml-8 self-start">
          <Text size="xs" bold className=" text-primary-950">Group name</Text>
        </Box>
        
        <HStack space="md" className="items-center ">
          <Icon as={Users} className="text-primary-100"/>
        <Heading className="text-center text-primary-100 capitalize ">
          {group.name}
        </Heading>
        </HStack>
          {noSubscription ? (
            <Animated.View entering={SlideInRight} className="ml-8">
              <HStack className=" items-center gap-2">
                <Icon as={Info} className=" text-error-500" />
              <Text className=" text-error-500 text-nowrap" italic size="sm"   >
                No subscription
              </Text>
              </HStack>
          </Animated.View>
          ) : expired ?  (
            <Box className="ml-8">
           {subscription && <Text>{ `${subscription?.name} subscription`}</Text>}
            <Animated.View entering={SlideInRight} >
                <HStack className=" items-center gap-2">
                    <Icon as={Info} className=" text-error-500" />
                <Text className=" text-error-500 text-nowrap" italic size="sm"   >
                    {t("subscriptionExpired")}
                </Text>
                </HStack>
            </Animated.View>
            </Box>
          ) 
          : null
    }
        </VStack>
        {
        (expired || noSubscription ) && 
        <Box>
        <Animated.View className={ "rounded-full p-2"} style={{backgroundColor:sharedBackgroundColor}}>
          <Button
                action="positive"
                className="rounded-full bg-transparent aspect-square"
                onPress={() => {
                  router.push({
                    pathname: "/stacks/subscriptions",
                    params: {
                      groupId: group.id,
                      action: "renew",
                    },
                  });
                }}
              >
                <ButtonIcon as={DollarSign} />
          </Button>
        </Animated.View>
        </Box>
        }
        </HStack>
  )
}

export default GroupSubscriptionBanner