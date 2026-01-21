import { getGoogleMapsDirectionURL } from '@/utils';
import { router } from 'expo-router';
import { Car, MapPin, Siren } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { sosResponseT, withoutIdT } from 'sgk-commanders-shared';
import { addSOSResponse, joinedSOSSchemaT } from 'sgk-commanders-shared/dist/supabase/sos';
import { useDashboardContext } from './context/DashboardContextProvider';
import { Avatar, AvatarFallbackText, AvatarImage } from './ui/avatar';
import { Box } from './ui/box';
import { Button, ButtonIcon } from './ui/button';
import { Heading } from './ui/heading';
import { HStack } from './ui/hstack';
import { Text } from './ui/text';

const SOSCard = ({sos}:{sos:joinedSOSSchemaT}) => {
     const {sosMethods:{activeSos}, user, locationMethods:{userLocation}} = useDashboardContext()
  
      async function interveneSOS(
        sosResponse: withoutIdT<sosResponseT>,
        sos: joinedSOSSchemaT
      ) {
        const res = await addSOSResponse(sosResponse);
      }
  return (
      <TouchableOpacity
                        onPress={() => {
                          router.push("/tabs/sos");
                        }}
                      >
                        <HStack space="sm" className=" items-center p-2">
                          <Avatar>
                            <AvatarFallbackText>
                              {sos.sent_by.name}
                            </AvatarFallbackText>
                            <AvatarImage
                              source={{
                                uri: sos.sent_by.profile_picture ?? "/",
                              }}
                            />
                          </Avatar>
                          <Box className="flex-grow">
                            <Heading className=" text-typography-100 capitalize">
                              {sos.sent_by.name}
                            </Heading>
                            <Text size="sm">{sos.message}</Text>
                          </Box>
                          <HStack space="sm">
                            <Button
                              action={
                                activeSos && activeSos.id === sos.id
                                  ? "positive"
                                  : "primary"
                              }
                              onPress={(e) => {
                                e.stopPropagation();
                                !activeSos
                                  ? interveneSOS(
                                      {
                                        sos: sos.id!,
                                        response_by: user.id!,
                                      },
                                      sos
                                    )
                                  : userLocation
                                  ? router.navigate(
                                      getGoogleMapsDirectionURL(
                                        userLocation,
                                        activeSos.location
                                      )
                                    )
                                  : null;
                              }}
                            >
                              <ButtonIcon
                                as={activeSos ? Car : Siren}
                              />
                              {
                                activeSos && 
                              <ButtonIcon
                                as={ MapPin }
                              />
                              }
                            </Button>
                          </HStack>
                        </HStack>
                      </TouchableOpacity>
  )
}

export default SOSCard