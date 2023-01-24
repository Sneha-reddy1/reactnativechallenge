import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Text, Pressable, FlatList, Dimensions, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios";
import VideoPlayer from 'react-native-video-controls';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window')
const ListScreen = (props) => {

    const [dataList, setDataList] = useState([])
    const [loading, setLoading] = useState(true)
    const [pauseVideo, setPauseVideo] = useState(false)

    useEffect(() => {
        getList()
    }, [])

    async function getList() {
        let url = "https://api.jsonbin.io/v3/b/63c95c3bdfc68e59d586aaed"

        await axios.get(url).then((res) => {

            if (res?.data && res?.data?.record?.items) {
                setDataList(res.data.record.items)
            } else {
                setDataList([])
            }

        }).catch((err) => {

            let errorMessage = JSON.parse(JSON.stringify(err))
            if (errorMessage && errorMessage?.message) {
                alert(errorMessage?.message)
            } else {
                alert('Failed to get data')
            }
        })
        setLoading(false)
    }

    function renderHeader() {
        return (
            <View style={styles.headerContainer}>
                    <Text style={styles.hearderTitle}>List View</Text>
            </View>
        )
    }

    function renderImageContent(item, index) {

        return (
            <View style={styles.imageContainer}>
                <Image style={styles.imageContainer} source={{ uri: item.url }} />
                <TouchableOpacity style={styles.videoOverlay} onPress={() => onPresscardItem(item)} />
            </View>
        )
    }

    function onPresscardItem(item) {
        props.navigation.navigate('DetailsScreen', {details: item})
    }

    function onLoadVideo() {
        setTimeout(() => {
            setPauseVideo(true)
        }, 10)
    }

    function renderVideoContent(item, index) {
        return (
            <View style={styles.imageContainer}>
                <VideoPlayer
                    autoplay={false}
                    repeat={false}
                    showOnStart={false}
                    style={styles.imageContainer}
                    source={{ uri: item.url }}
                    onLoad={onLoadVideo}
                    paused={pauseVideo}
                />
                <TouchableOpacity style={styles.videoOverlay} onPress={() => onPresscardItem(item)} />

            </View>
        )
    }

    function renderFlatListItem({ item, index }) {
        return (
            <View style={styles.itemContainer}>
                {item.type === 'image' ? renderImageContent(item, index) : null}
                {item.type === 'video' ? renderVideoContent(item, index) : null}
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {renderHeader()}

                <View style={styles.flatlistContainer}>
                    {loading ? <ActivityIndicator
                        animating
                        size={'large'} />
                        :
                        <FlatList
                            data={dataList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderFlatListItem}
                            extraData={dataList}
                        />}
                </View>
            </View>
        </SafeAreaView>
    )
}


export default ListScreen;

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
        justifyContent: 'center',
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
    flatlistContainer: {
        flex: 1,
    },
    itemContainer: {
        width: '90%',
        height: 200,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        alignSelf: 'center',
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '100%'
    },
    videoOverlay: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        backgroundColor: 'transparent',
        right: 0,
        top: 0,
    },
})