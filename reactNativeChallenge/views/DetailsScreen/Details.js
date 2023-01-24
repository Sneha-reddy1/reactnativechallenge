import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Text, Pressable, Image } from "react-native";
import VideoPlayer from 'react-native-video-controls';


const DetailsScreen = (props) => {

    const [details, setDetails] = useState(null)

    useEffect(() => {
        setDetails(props.route.params.details)
    }, [])

    function onPressBackBtn() {
        props.navigation.goBack()
    }

    function renderHeader() {
        return (
            <View style={styles.headerContainer}>
                <Pressable onPress={onPressBackBtn} style={styles.backBtnContainer}>
                    <Text style={styles.backBtn}>Back</Text>
                </Pressable>
                <View style={styles.innerHeader}>
                    <Text style={styles.hearderTitle}>Details View</Text>
                </View>
            </View>
        )
    }

    function renderImage() {
        return (
            <View style={styles.imgView}>
                <Image resizeMode="contain" style={styles.imgView} source={{ uri: details.url }} />
            </View>
        )
    }

    function renderVideo() {
        return (
            <View style={styles.imgView}>
                <VideoPlayer
                    autoplay={false}
                    repeat={false}
                    showOnStart={false}
                    style={styles.imgView}
                    source={{ uri: details.url }}
                    disableBack={true}
                    isFullscreen={true}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {renderHeader()}

                <View style={styles.displayContainer}>
                    {details && details.type == 'image' && renderImage()}
                    {details && details.type == 'video' && renderVideo()}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000'
    },
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    headerContainer: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backBtnContainer: {
        marginLeft: 10
    },
    backBtn: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    innerHeader: {
        flex: 0.8,
        alignItems: 'center'
    },
    hearderTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    displayContainer: {
        flex: 1,
    },
    imgView: {
        width: '100%',
        height: '100%',
    }
})