import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const POPOVER_ALIGN = [
  'left',
  'right',
];

/*
With some modification copy-pasted from
https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
*/
const outsideClickNotifier = WrappedComponent => class extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (!this.wrapperRef) {
      return;
    }

    if (!this.props.isVisible) {
      return;
    }

    if ((this.wrapperRef !== event.target) && !this.wrapperRef.contains(event.target)) {
      this.props.onOutsideClick();
    }
  }

  render() {
    const { onOutsideClick, ...rest } = this.props; //eslint-disable-line no-unused-vars
    return <WrappedComponent rootRef={(node)=> this.wrapperRef = node} {...rest} />;
  }

  static propTypes = {
    onOutsideClick: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
  };
};

let EuiExpressionItemPopover = ({
  className,
  title,
  isVisible,
  children,
  rootRef,
  align = 'left',
  ...rest
}) => {
  const classes = classNames('euiExpressionItem__popover', className, {
    'euiExpressionItem__popover--isHidden': !isVisible,
    'euiExpressionItem__popover--alignRight': align === 'right'
  });
  return (
    <div
      ref={rootRef}
      className={classes}
      {...rest}
    >
      <div className="euiExpressionItem__popoverTitle">
        {title}
      </div>
      <div className="euiExpressionItem__popoverContent">
        {children}
      </div>
    </div>
  );
};

EuiExpressionItemPopover.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node.isRequired,
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.node,
  align: PropTypes.oneOf(POPOVER_ALIGN),
  //only for outsideClickNotifier
  rootRef: PropTypes.func.isRequired,
};

EuiExpressionItemPopover = outsideClickNotifier(EuiExpressionItemPopover);

export {
  POPOVER_ALIGN,
  EuiExpressionItemPopover
};
