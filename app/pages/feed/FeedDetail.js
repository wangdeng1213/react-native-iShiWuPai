/**
 * Created by ljunb on 16/5/30.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    WebView,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    Platform
} from 'react-native';
import Header from '../../components/HomeNavigation';
import Common from '../../common/constants';
import ShareView from '../../components/ShareView';

export default class FeedDetail extends Component {

    render() {
        const {feed} = this.props;

        return (
            feed.link ?
                <WebViewComponent
                    popAction={() => this.props.navigator.pop()}
                    uri={feed.link}
                /> :
                <View>
                    <CardImageComponent
                        popAction={() => this.props.navigator.pop()}
                        shareAction={() => this.shareView.share()}
                        collectAction={() => alert('collect')}
                        feed={feed}
                    />
                    <ShareView ref={shareView => this.shareView = shareView}/>
                </View>
        )
    }
}

const WebViewComponent = ({
    popAction,
    uri
}) => {
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <Header
                leftIconAction={popAction}
                title='资讯详情'
                leftIcon={require('../../resource/ic_back_dark.png')}
            />
            <WebView
                source={{uri}}
                startInLoadingState={true}
                bounces={false}
                scalesPageToFit={true}
                style={styles.webView}
            />
        </View>
    )
};

const CardImageComponent = ({
    popAction,
    shareAction,
    collectAction,
    feed
}) => {
    let flagIndex = feed.card_image.indexOf('food') + 5;
    let publishDate = feed.card_image.substr(flagIndex, 10).replace(/\//g, '-');
    let cardImageSrc = feed.card_image.split('?')[0];

    let imageScale = feed.card_image.split('?')[1].split('/')[1];
    let imageSourceW = feed.card_image.split('?')[1].split('/')[3];
    let cardImageH = Common.window.height * (imageSourceW / imageScale) / Common.window.width;

    let platformMargin = Platform.OS === 'ios' ? -40 : -30;

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <Header
                leftIconAction={popAction}
                title='查看详情'
                leftIcon={require('../../resource/ic_back_dark.png')}
                rightIcon={require('../../resource/ic_photo_share.png')}
                rightIconSize={16}
                rightIconAction={shareAction}
            />
            <View style={[styles.cardImageContent]}>
                <ScrollView
                    removeClippedSubviews={true}
                    contentContainerStyle={{backgroundColor: 'white'}}
                >
                    <View style={{
                        flexDirection: 'row',
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        alignItems: 'center',
                        overflow: 'hidden'
                    }}>
                        <Image
                            style={{width: 40, height: 40, borderRadius: 20}}
                            source={{uri: feed.publisher_avatar}}
                            defaultSource={require('../../resource/img_default_avatar.png')}
                        />
                        <View style={{marginLeft: 10}}>
                            <Text style={{color: 'black'}}>{feed.publisher}</Text>
                            <Text style={{color: 'gray'}}>{publishDate}</Text>
                        </View>
                    </View>
                    <Image
                        style={{width: Common.window.width, height: cardImageH, marginTop: platformMargin}}
                        source={{uri: cardImageSrc}}
                        defaultSource={require('../../resource/img_horizontal_default.png')}
                        resizeMode={'contain'}
                    />
                    {feed.description != '' &&
                    <View style={{
                        borderColor: '#ccc',
                        borderTopWidth: 0.5,
                        paddingVertical: 20,
                        paddingHorizontal: 15,
                        justifyContent: 'center',
                        marginTop: platformMargin
                    }}>
                        <Text style={{color: 'black'}}>{feed.description}</Text>
                    </View>
                    }
                    <View style={{height: 10, width: Common.window.width, backgroundColor: '#f5f5f5'}}/>
                </ScrollView>
            </View>
            <TouchableOpacity
                activeOpacity={0.75}
                style={styles.bottomToolBar}
                onPress={collectAction}
            >
                <Image style={{width: 18, height: 18}} source={require('../../resource/ic_feed_like.png')}/>
                <Text style={{color: 'black', marginLeft: 5}}>{feed.like_ct}</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    webView: {
        width: Common.window.width,
        height: Common.window.height - Platform.OS === 'ios' ? 64 : 50,
    },
    bottomToolBar: {
        height: 44,
        width: Common.window.width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopColor: '#ccc',
        borderTopWidth: 0.5,
        position: 'absolute',
    },
    cardImageContent: {
        height: Common.window.height - (Platform.OS === 'ios' ? 64 : 50) - 44,
        width: Common.window.width,
        backgroundColor: '#f5f5f5'
    }
})
