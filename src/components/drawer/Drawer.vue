<template>
    <div :class="[prefixCls]">
        <transition name="fade">
            <div :class="maskClasses" :style="maskStyle" v-show="visible" v-if="mask" @click="handleMask"></div>
        </transition>
        <div :class="wrapClasses" @click="handleWrapClick">
            <transition :name="'move-' + placement">
                <div :class="classes" :style="mainStyles" v-show="visible">
                    <div :class="contentClasses" ref="content">
                        <a class="drawer-layout-close" v-if="closable" @click="close">
                            <slot name="close">
                                <i class="el-icon-close"></i>
                            </slot>
                        </a>
                        <div :class="[prefixCls + '-header']" v-if="showHead"><slot name="header"><div :class="[prefixCls + '-header-inner']">{{ title }}</div></slot></div>
                        <div :class="[prefixCls + '-body']" :style="styles"><slot></slot></div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    const prefixCls = 'drawer-layout';
    export default {
        name: 'Drawer',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            title: {
                type: String
            },
            width: {
                type: [Number, String],
                default: 256
            },
            closable: {
                type: Boolean,
                default: true
            },
            maskClosable: {
                type: Boolean,
                default: true
            },
            mask: {
                type: Boolean,
                default: true
            },
            maskStyle: {
                type: Object
            },
            styles: {
                type: Object
            },
            placement: {
                validator (value) {
                    return ['left', 'right'].indexOf(value);
                },
                default: 'right'
            },
            zIndex: {
                type: Number,
                default: 1000
            },
            className: {
                type: String
            },
            inner: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                prefixCls: prefixCls,
                visible: this.value,
                wrapShow: false,
                showHead: true,
            };
        },
        computed: {
            wrapClasses () {
                return [
                    `${prefixCls}-wrap`,
                    {
                        [`${prefixCls}-hidden`]: !this.wrapShow,
                        [`${this.className}`]: !!this.className,
                        [`${prefixCls}-no-mask`]: !this.mask,
                        [`${prefixCls}-wrap-inner`]: this.inner
                    }
                ];
            },
            mainStyles () {
                let style = {};
                const width = parseInt(this.width);
                const styleWidth = {
                    width: width <= 100 ? `${width}%` : `${width}px`
                };
                Object.assign(style, styleWidth);
                return style;
            },
            contentClasses () {
                return [
                    `${prefixCls}-content`,
                    {
                        [`${prefixCls}-content-no-mask`]: !this.mask
                    }
                ];
            },
            classes () {
                return [
                    `${prefixCls}`,
                    `${prefixCls}-${this.placement}`,
                    {
                        [`${prefixCls}-no-header`]: !this.showHead,
                        [`${prefixCls}-inner`]: this.inner
                    }
                ];
            },
            maskClasses () {
                return [
                    `${prefixCls}-mask`,
                    {
                        [`${prefixCls}-mask-inner`]: this.inner
                    }
                ];
            }
        },
        methods: {
            close () {
                this.visible = false;
                this.$emit('on-close');
            },
            handleMask () {
                if (this.maskClosable && this.mask) {
                    this.close();
                }
            },
            handleWrapClick (event) {
                // use indexOf,do not use === ,because h-modal-wrap can have other custom className
                const className = event.target.getAttribute('class');
                if (className && className.indexOf(`${prefixCls}-wrap`) > -1) this.handleMask();
            },
        },
        mounted () {
            if (this.visible) {
                this.wrapShow = true;
            }
            let showHead = true;
            if (this.$slots.header === undefined && !this.title) {
                showHead = false;
            }
            this.showHead = showHead;
        },
        watch: {
            value (val) {
                this.visible = val;
            },
            visible (val) {
                if (val === false) {
                    this.timer = setTimeout(() => {
                        this.wrapShow = false;
                    }, 300);
                } else {
                    if (this.timer) clearTimeout(this.timer);
                    this.wrapShow = true;
                }
            },
            title (val) {
                if (this.$slots.header === undefined) {
                    this.showHead = !!val;
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
@import './Drawer.scss';
</style>
