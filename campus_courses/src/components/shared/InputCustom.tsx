import { ReactNode, useId } from 'react'
import { FormControl, FormControlProps, FormGroup, FormLabel } from 'react-bootstrap'
import { ErrorMessage } from './ErrorMessage'

interface IInputCustom extends FormControlProps {
	name: string
	labelClassName?: string
	label?: ReactNode
	messageError?: string
	register?: any
	rows?: number
	validateFn?: (value: string) => boolean | string
}

export function InputCustom(props: IInputCustom) {
	const id = useId()
	if (props.register) {
	}
	return (
		<FormGroup>
			<FormLabel className={props.labelClassName} htmlFor={`custom_input_${props.label}_${id}`}>
				{props.label}
			</FormLabel>
			{props.register ? (
				<FormControl
					id={`custom_input_${props.label}_${id}`}
					type={props.type}
					name={props.name}
					as={props.as}
					rows={props.rows}
					{...props.register(props.name, { validate: props.validateFn })}
				/>
			) : (
				<FormControl
					id={`custom_input_${props.label}_${id}`}
					type={props.type}
					name={props.name}
					defaultValue={props.value}
					disabled={props.disabled}
				/>
			)}

			<ErrorMessage text={props.messageError}></ErrorMessage>
		</FormGroup>
	)
}
